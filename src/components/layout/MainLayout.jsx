import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
import Footer from './Footer';
import { CartProvider } from '../../Pages/CartContext';

export default function MainLayout() {
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
