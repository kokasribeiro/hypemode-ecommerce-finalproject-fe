import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
import Footer from './Footer';
import useScrollToTop from '../../hooks/useScrollToTop';
import { CartProvider } from '../../contexts/CartContext';

export default function MainLayout() {
  useScrollToTop();

  return (
    <CartProvider>
      <div className='min-h-screen bg-white dark:bg-gray-900'>
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
