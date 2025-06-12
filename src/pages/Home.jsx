import Benefits from '../sections/Benefits';
import NewArrivals from '../sections/NewArrivals';
import Categories from '../sections/Categories';
import PopularProducts from '../sections/PopularProducts';
import TrendInsights from '../sections/TrendInsights';
import HighlightsProducts from '../sections/HighlightsProducts';
import NewsletterUpdates from '../sections/NewsletterUpdates';
import FinalSale from '../sections/FinalSale';
import HeaderMain from '../components/layout/HeaderMain';
import SEO from '../components/SEO';
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
      <SEO
        title='Home - Premium Fashion and Style'
        description='Discover the latest fashion trends at HypeMode Store. Clothing, shoes, and accessories from the best brands with fast and secure delivery.'
        keywords='fashion, online clothing, shoes, accessories, trends, style, fashion store, fashion'
        url=''
      />
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
