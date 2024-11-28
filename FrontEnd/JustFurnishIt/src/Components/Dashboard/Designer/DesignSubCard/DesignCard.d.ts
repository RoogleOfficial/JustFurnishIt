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
declare const DesignCard: React.FC<DesignCardProps>;
export default DesignCard;
