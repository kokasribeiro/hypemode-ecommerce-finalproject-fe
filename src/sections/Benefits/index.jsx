import React from 'react';
import BenefitCard from '../../components/ui/BenefitCard';
import LayoutContainer from '../../components/layout/LayoutContainer';
import { benefitsData } from '../../data';

const Benefits = () => {
  return (
    <section className='bg-black'>
      <LayoutContainer>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {benefitsData.map((benefit, index) => (
            <BenefitCard key={index} title={benefit.title} subtitle={benefit.subtitle} icon={benefit.icon} />
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default Benefits;
