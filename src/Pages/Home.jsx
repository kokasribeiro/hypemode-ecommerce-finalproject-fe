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
import { fetchProducts } from '../utils/api/mockapi';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <HeaderMain />
      <Benefits />
      <NewArrivals showViewAll={true} products={products} />
      <Categories />
      <PopularProducts showViewAll={true} products={products} />
      <TrendInsights />
      <HighlightsProducts products={products} />
      <NewsletterUpdates />
      <FinalSale products={products} />
    </>
  );
}
