import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';
import AboutUs from './pages/AboutUs.jsx';
import News from './pages/News.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/news",
    element: <News />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
