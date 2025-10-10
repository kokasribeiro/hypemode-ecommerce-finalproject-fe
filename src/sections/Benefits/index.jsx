import React from 'react';
import BenefitCard from '../../components/features/BenefitCard';
import LayoutContainer from '../../components/layout/LayoutContainer';
import { BENEFITS_DATA as benefitsData } from '../../constants';

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
