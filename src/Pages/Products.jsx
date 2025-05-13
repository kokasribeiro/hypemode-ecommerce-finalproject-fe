import { useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://681b1c4d17018fe5057a0e51.mockapi.io/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  console.log(products);

  return (
    <>
      <SecondaryHeader title='Products' />
      <LayoutContainer>
        <h1 className='text-2xl font-bold my-10'>This is my products</h1>
        <div className='flex gap-4 w-full'>
          <div className='w-1/4'>left side bar</div>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-10 w-full'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </LayoutContainer>
    </>
  );
}
