import React from 'react';
import { FaCreditCard } from 'react-icons/fa';
import BenefitCard from '../ui/BenefitCard';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';




const Benefits = () => {
  return (
    <section className='bg-black'>
      <div className='flex justify-between px-8 max-w-7xl mx-auto'>
        <BenefitCard
          title='Secure Payment'
          subtitle='100% secure payment'
          icon={<FaCreditCard className='text-5xl' />}
        />
        <BenefitCard
          title='30 Days Return'
          subtitle='If goods have problems'
          icon={<RiMoneyDollarCircleFill className='text-5xl' />}
        />
        <BenefitCard
          title='24/7 Support'
          subtitle='Dedicated support'
          icon={<MdOutlineSupportAgent className='text-5xl' />}
        />
        <BenefitCard
          title='Free Delivery'
          subtitle='For all order over 80$'
          icon={<TbTruckDelivery className='text-5xl' />}
        />
      </div>
    </section>
  );
};

export default Benefits;
