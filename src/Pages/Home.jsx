import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Benefits from '../components/Benefits';
import NewArrivals from '../components/NewArrivals';
import Categories from '../components/Categories';
import PopularProducts from '../components/PopularProducts';
import TrendInsights from '../components/TrendInsights';
import HighlightsProducts from '../components/HighlightsProducts';
import NewsletterUpdates from '../components/NewsletterUpdates';
import FinalSale from '../components/FinalSale';

export default function Home() {
  return (
    <main className='min-h-screen bg-white'>
    <NavBar />
    <Header />
    <Benefits />
    <NewArrivals />
    <Categories />
    <PopularProducts />
    <TrendInsights />
    <HighlightsProducts />
    <NewsletterUpdates />
    <FinalSale />
  </main>
  );
}
