import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import SEO from '../components/SEO';
import { Star } from 'lucide-react';
import ButtonPrimary from '../components/features/ButtonPrimary';
import { useCart } from '../contexts/CartContext';
import { assignProductRating, createFlyToCartAnimation } from '../utils';
import { clothingCategories, shoesCategories, necklaceCategories, backpackCategories, sizesData } from '../data';
import { fetchProductById } from '../utils/api/mockapi';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();
  const productImageRef = useRef(null);

  const isClothing = product?.category && clothingCategories.includes(product.category.toLowerCase().trim());
  const isShoes = product?.category && shoesCategories.includes(product.category.toLowerCase().trim());
  const isNecklace =
    (product?.category && necklaceCategories.includes(product.category.toLowerCase().trim())) ||
    (product?.name && necklaceCategories.some((word) => product.name.toLowerCase().includes(word)));
  const isBackpack = product?.name && backpackCategories.some((word) => product.name.toLowerCase().includes(word));
  const needsSize = isClothing || isShoes || isNecklace || isBackpack;

  const sizes = isShoes
    ? sizesData.shoes
    : isNecklace
    ? sizesData.necklace
    : isBackpack
    ? sizesData.backpack
    : sizesData.clothing;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setSelectedSize('');
        const data = await fetchProductById(id);
        const consistentRating = assignProductRating(data.id);
        setProduct({ ...data, displayRating: consistentRating });
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const calculateSalePrice = (originalPrice) => {
    const productIdNumber = parseInt(product.id, 10);
    const discountBase = productIdNumber ? (productIdNumber % 11) / 100 + 0.1 : 0.15;
    const discountedPrice = originalPrice * (1 - discountBase);
    return Number(discountedPrice.toFixed(2));
  };

  const renderStars = () => {
    if (!product) return null;

    const rating = product.displayRating || 5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className={`h-4 w-4 md:h-5 md:w-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
        />,
      );
    }
    return stars;
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (needsSize && !selectedSize) {
      alert('Please select a size first');
      return;
    }

    addToCart(product, needsSize ? selectedSize : null);

    if (productImageRef.current) {
      createFlyToCartAnimation(productImageRef.current, product.image);
    }
  };

  if (loading) {
    return (
      <>
        <SEO
          title={product ? `${product.name} - ${product.category}` : 'Product Details'}
          description={
            product
              ? `${product.name} - ${product.category}. Price: €${
                  product.sale ? calculateSalePrice(product.price) : product.price
                }. ${product.description || 'Quality product from HypeMode Store.'}`
              : 'Details of the selected product at HypeMode Store.'
          }
          keywords={
            product
              ? `${product.name}, ${product.category}, fashion, ${product.sale ? 'offer, discount,' : ''} buy online`
              : 'product, details, fashion'
          }
          url={`/products/${id}`}
          image={product?.image}
          type='product'
        />
        <SecondaryHeader title='Product Detail' />
        <LayoutContainer>
          <div className='flex justify-center items-center min-h-[200px] md:min-h-[400px] p-4'>
            <p>Loading product details...</p>
          </div>
        </LayoutContainer>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <SEO
          title={product ? `${product.name} - ${product.category}` : 'Product Details'}
          description={
            product
              ? `${product.name} - ${product.category}. Price: €${
                  product.sale ? calculateSalePrice(product.price) : product.price
                }. ${product.description || 'Quality product from HypeMode Store.'}`
              : 'Details of the selected product at HypeMode Store.'
          }
          keywords={
            product
              ? `${product.name}, ${product.category}, fashion, ${product.sale ? 'offer, discount,' : ''} buy online`
              : 'product, details, fashion'
          }
          url={`/products/${id}`}
          image={product?.image}
          type='product'
        />
        <SecondaryHeader title='Product Detail' />
        <LayoutContainer>
          <div className='flex justify-center items-center min-h-[200px] md:min-h-[400px] p-4'>
            <p>Product not found.</p>
          </div>
        </LayoutContainer>
      </>
    );
  }

  return (
    <>
      <SEO
        title={product ? `${product.name} - ${product.category}` : 'Product Details'}
        description={
          product
            ? `${product.name} - ${product.category}. Price: €${
                product.sale ? calculateSalePrice(product.price) : product.price
              }. ${product.description || 'Quality product from HypeMode Store.'}`
            : 'Details of the selected product at HypeMode Store.'
        }
        keywords={
          product
            ? `${product.name}, ${product.category}, fashion, ${product.sale ? 'offer, discount,' : ''} buy online`
            : 'product, details, fashion'
        }
        url={`/products/${id}`}
        image={product?.image}
        type='product'
      />
      <SecondaryHeader title='Product Detail' />
      <LayoutContainer>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-8'>
          <div className='relative'>
            <img
              ref={productImageRef}
              src={product.image}
              alt={product.name}
              className='w-full h-auto rounded-lg shadow-lg'
            />
            {product.sale && (
              <div className='absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                SALE
              </div>
            )}
          </div>

          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800 mb-2'>{product.name}</h1>
              <div className='flex items-center space-x-2 mb-4'>
                <div className='flex'>{renderStars()}</div>
                <span className='text-gray-500'>|</span>
                <span className='text-gray-600'>{product.category}</span>
              </div>

              <div className='flex items-center space-x-3'>
                {product.sale ? (
                  <>
                    <span className='text-2xl font-bold text-red-600'>€{calculateSalePrice(product.price)}</span>
                    <span className='text-lg text-gray-400 line-through'>€{product.price}</span>
                    <span className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold'>
                      {Math.round((1 - calculateSalePrice(product.price) / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className='text-2xl font-bold text-gray-800'>€{product.price}</span>
                )}
              </div>
            </div>

            {needsSize && (
              <div className='my-6'>
                <p className='text-base font-semibold mb-3'>
                  Select Size:
                  {selectedSize && <span className='text-red-600 ml-2'>({selectedSize} selected)</span>}
                </p>
                <div className='flex gap-3'>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`w-12 h-12 flex items-center justify-center border-2 rounded ${
                        selectedSize === size
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-gray-300 hover:border-red-500 hover:bg-red-500 hover:text-white'
                      } transition-colors duration-200 text-lg font-medium`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className='text-sm text-gray-500 mt-2'>Select one size for this item</p>
              </div>
            )}

            <div className='my-4 md:my-6'>
              <h3 className='text-base md:text-lg font-semibold mb-2'>Description</h3>
              <p className='text-gray-600 text-sm md:text-base'>
                {product.description || 'No description available for this product.'}
              </p>
            </div>
            <div className='pt-2 md:pt-4'>
              <ButtonPrimary buttonText='Add to Cart' onClick={handleAddToCart} />
            </div>
          </div>
        </div>
      </LayoutContainer>
    </>
  );
}
