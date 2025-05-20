import Benefits from '../sections/Benefits';
import NewArrivals from '../sections/NewArrivals';
import Categories from '../sections/Categories';
import PopularProducts from '../sections/PopularProducts';
import TrendInsights from '../sections/TrendInsights';
import HighlightsProducts from '../sections/HighlightsProducts';
import NewsletterUpdates from '../sections/NewsletterUpdates';
import FinalSale from '../sections/FinalSale';
import HeaderMain from '../components/layout/HeaderMain';
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://681b1c4d17018fe5057a0e51.mockapi.io/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <HeaderMain />
      <Benefits />
      <NewArrivals products={products} />
      <Categories />
      <PopularProducts products={products} />
      <TrendInsights />
      <HighlightsProducts products={products} />
      <NewsletterUpdates />
      <FinalSale products={products} />
    </>
  );
}
