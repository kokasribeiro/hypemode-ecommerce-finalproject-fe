import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import { Star } from 'lucide-react';
import ButtonPrimary from '../components/ui/ButtonPrimary';
import { useCart } from '../../useCart';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://681b1c4d17018fe5057a0e51.mockapi.io/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const randomRating = Math.floor(Math.random() * 3) + 3;
        setProduct({ ...data, displayRating: randomRating });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
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

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
    }
  };

  if (loading) {
    return (
      <>
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
      <SecondaryHeader title='Product Detail' />
      <LayoutContainer>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 max-w-6xl mx-auto'>
          <div className='w-full'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-auto max-h-[400px] md:max-h-[600px] object-cover rounded-lg shadow-lg'
            />
          </div>
          <div className='space-y-3 md:space-y-4'>
            <h1 className='text-2xl md:text-3xl font-bold'>{product.name}</h1>
            <div className='flex items-center space-x-2'>
              <div className='flex'>{renderStars()}</div>
              <span className='text-gray-500 text-sm'>(5 reviews)</span>
            </div>
            {product.sale ? (
              <div className='flex items-center space-x-3'>
                <span className='text-red-600 text-xl md:text-2xl font-bold'>€{calculateSalePrice(product.price)}</span>
                <span className='text-gray-500 text-lg md:text-xl line-through'>
                  €{Number(product.price).toFixed(2)}
                </span>
              </div>
            ) : (
              <p className='text-xl md:text-2xl font-bold'>€{Number(product.price).toFixed(2)}</p>
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
