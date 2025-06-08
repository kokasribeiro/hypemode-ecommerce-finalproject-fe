import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
import Footer from './Footer';
import useScrollToTop from '../../hooks/useScrollToTop';
import { CartProvider } from '../../Pages/CartContext';

export default function MainLayout() {
  useScrollToTop();

  return (
    <CartProvider>
      <div className='min-h-screen bg-white'>
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
