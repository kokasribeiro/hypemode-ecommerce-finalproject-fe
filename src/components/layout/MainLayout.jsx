import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}