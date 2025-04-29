// import NavBar from '../components/ui/Navbar';
// import HeaderMain from '../components/layout/HeaderMain';
import Benefits from '../sections/Benefits';
import NewArrivals from '../sections/NewArrivals';
import Categories from '../sections/Categories';
import PopularProducts from '../sections/PopularProducts';
import TrendInsights from '../sections/TrendInsights';
import HighlightsProducts from '../sections/HighlightsProducts';
import NewsletterUpdates from '../sections/NewsletterUpdates';
import FinalSale from '../sections/FinalSale';
import HeaderMain from '../components/layout/HeaderMain';
export default function Home() {
  return (
    <>
      <HeaderMain />
      <Benefits />
      <NewArrivals />
      <Categories />
      <PopularProducts />
      <TrendInsights />
      <HighlightsProducts />
      <NewsletterUpdates />
      <FinalSale />
    </>
  );
}
