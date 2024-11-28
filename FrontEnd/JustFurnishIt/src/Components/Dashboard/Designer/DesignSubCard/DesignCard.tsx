import React from 'react';

interface PlanData {
  new: number;
  renew: number;
  modular: string;
  furniture: string;
  services: string;
}

interface DesignCardProps {
  title: string;
  plan: PlanData;
}

const DesignCard: React.FC<DesignCardProps> = ({ title, plan }) => {
  return (
    <div className="max-w-sm w-full rounded-lg shadow-lg bg-white p-6 m-4 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">New Installations: {plan.new || 0} sq ft</p>
      <p className="text-gray-500 mb-4">Renewals: {plan.renew || 0} sq ft</p>
      <div className="mt-4">
        <h4 className="font-semibold text-lg text-gray-700">Modular</h4>
        <p className="text-gray-600 mb-4">{plan.modular || 'Not available'}</p>
        <h4 className="font-semibold text-lg text-gray-700">Furniture</h4>
        <p className="text-gray-600 mb-4">{plan.furniture || 'Not available'}</p>
        <h4 className="font-semibold text-lg text-gray-700">Services</h4>
        <p className="text-gray-600">{plan.services || 'Not available'}</p>
      </div>
    </div>
  );
};

export default DesignCard;
