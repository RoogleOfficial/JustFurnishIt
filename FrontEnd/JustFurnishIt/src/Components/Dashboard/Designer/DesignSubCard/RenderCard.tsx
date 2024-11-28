import React from 'react';
import DesignCard from './DesignCard';

interface PlanData {
  new: number;
  renew: number;
  modular: string;
  furniture: string;
  services: string;
}

interface PlansContainerProps {
  basic?: PlanData;
  intermediate?: PlanData;
  premium?: PlanData;
}

const PlansContainer: React.FC<PlansContainerProps> = ({ basic, intermediate, premium }) => {
  // Default empty plan data if any of the plans are undefined
  const defaultPlan = {
    new: 0,
    renew: 0,
    modular: 'Not available',
    furniture: 'Not available',
    services: 'Not available',
  };

  return (
    <div>
      <h1 className='pt-8 font-bold text-2xl'>Subscription Plan Details</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 py-2">
        <DesignCard title="Basic Plan" plan={basic || defaultPlan} />
        <DesignCard title="Intermediate Plan" plan={intermediate || defaultPlan} />
        <DesignCard title="Premium Plan" plan={premium || defaultPlan} />
      </div>
    </div>
  );
};

export default PlansContainer;
