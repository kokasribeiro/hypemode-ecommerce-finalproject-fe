import { navItems } from '../../data';
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className='bg-black'>
      <div className=' text-gray-400 text-sm py-2 px-2 max-w-7xl mx-auto'>
        Don't miss our <u className='cursor-pointer hover:text-white'>holiday offer</u> - up to 50% OFF!
      </div>

      <nav className='bg-white py-6 px-8 text-gray-600 hidden md:block'>
        <div className='flex justify-between items-center max-w-7xl mx-auto'>
          <img src='../images/logo-ecommerce.png' alt='Logo' className='h-10 cursor-pointer' />

          <ul className='flex gap-9 cursor-pointer uppercase'>
            {navItems.map((item) => (
              <li
                key={item.id}
                className='hover:text-black hover:underline relative after:bg-red-500 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300'
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <div className='flex gap-3 cursor-pointer'>
            <img src='#' alt='1' className='hover:text-red-500' />
            <img src='#' alt='2' className='hover:text-red-500' />
            <img src='#' alt='3' className='hover:text-red-500' />
          </div>
        </div>
      </nav>
    </div>
  );
}
