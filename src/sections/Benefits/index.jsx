import React from 'react';
import { FaCreditCard } from 'react-icons/fa';
import BenefitCard from '../../components/ui/BenefitCard';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import LayoutContainer from '../../components/layout/LayoutContainer';

// Define the benefit data in an array
const benefitsData = [
  {
    title: 'Secure Payment',
    subtitle: '100% secure payment',
    icon: <FaCreditCard className='text-5xl' />,
  },
  {
    title: '30 Days Return',
    subtitle: 'If goods have problems',
    icon: <RiMoneyDollarCircleFill className='text-5xl' />,
  },
  {
    title: '24/7 Support',
    subtitle: 'Dedicated support',
    icon: <MdOutlineSupportAgent className='text-5xl' />,
  },
  {
    title: 'Free Delivery',
    subtitle: 'For all order over 80$',
    icon: <TbTruckDelivery className='text-5xl' />,
  },
];

const Benefits = () => {
  return (
    <section className='bg-black'>
      <LayoutContainer>
        <div className='flex flex-wrap justify-between'> 
          {benefitsData.map((benefit, index) => (
            <BenefitCard
              key={index} 
              title={benefit.title}
              subtitle={benefit.subtitle}
              icon={benefit.icon}
            />
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default Benefits;
