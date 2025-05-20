import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import { Star } from 'lucide-react';
import ButtonPrimary from '../components/ui/ButtonPrimary';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const renderStars = () => {
    if (!product) return null;

    const rating = product.displayRating || 5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className={`h-5 w-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
        />,
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <>
        <SecondaryHeader title='Product Detail' />
        <LayoutContainer>
          <div className='flex justify-center items-center min-h-[400px]'>
            <p>Loading product details...</p>
          </div>
        </LayoutContainer>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <SecondaryHeader title='Product Not Found' />
        <LayoutContainer>
          <div className='flex justify-center items-center min-h-[400px]'>
            <p>Product not found</p>
          </div>
        </LayoutContainer>
      </>
    );
  }

  return (
    <>
      <SecondaryHeader title={product.name || 'Product Detail'} />
      <LayoutContainer>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-10'>
          <div className='flex justify-center'>
            <img src={product.image} alt={product.name} className='max-h-[500px] object-contain' />
          </div>
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold'>{product.name}</h1>
            <div className='flex items-center space-x-2'>
              <div className='flex'>{renderStars()}</div>
              <span className='text-gray-500'>(5 reviews)</span>
            </div>
            <p className='text-2xl font-bold'>€{Number(product.price).toFixed(2)}</p>
            <div className='my-6'>
              <h3 className='text-lg font-semibold mb-2'>Description</h3>
              <p className='text-gray-600'>{product.description || 'No description available for this product.'}</p>
            </div>
            <div className='pt-4'>
              <ButtonPrimary buttonText='Add to Cart' />
            </div>
          </div>
        </div>
      </LayoutContainer>
    </>
  );
}
