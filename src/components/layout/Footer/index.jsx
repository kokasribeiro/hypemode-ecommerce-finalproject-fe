import React from 'react';
import LayoutContainer from '../LayoutContainer';

const Footer = () => {
  return (
    <footer className="bg-white py-12 md:py-16 border-t border-gray-200 mt-12"> 
      <LayoutContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"> 
          <div>
            <h5 className="font-bold mb-4">About Us</h5>
            <p className="text-gray-600 text-sm mb-3">
            Hypemode is a Geneva-born streetwear brand blending urban. We create limited-run pieces inspired by city life, youth culture, and underground vibes.
            Every piece is made to stand out.
            </p>
            <p className="text-gray-600 text-sm">
            Our mission? To bring raw street energy to everyday wear.
            More than fashion — its a mindset. Welcome to Hypemode.
            </p>
          </div>

          <div>
            <h5 className="font-bold mb-4">Account</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-red-700 text-sm">My Account</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-700 text-sm">My Wishlist</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-700 text-sm">My Cart</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-700 text-sm">Sign in</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-700 text-sm">Check out</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4">Shipping</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-red-700 text-sm">New Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-700 text-sm">Best Sellers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-700 text-sm">Manufacturers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-700 text-sm">Suppliers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-700 text-sm">Specials</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4">Contact Us</h5>
            <address className="not-italic text-gray-600 text-sm">
              <p>Phone: (+41) 77 973 97 80</p>
              <p>Fax: (+63) 555 0100</p>
              <br />
              <p>Geneve</p>
              <p>Rue de Lyon 118, 1203 Genève, Suíça</p>
            </address>
          </div>

        </div>

        <div className="text-center pt-9 border-t border-gray-200"> 
          <img src="/images/logo-ecommerce.png" alt="HypeMode Logo" className="h-15 mx-auto" />
           <span className="text-xl font-semibold">HypeMode</span> 
        </div>

      </LayoutContainer>
    </footer>
  );
};

export default Footer;