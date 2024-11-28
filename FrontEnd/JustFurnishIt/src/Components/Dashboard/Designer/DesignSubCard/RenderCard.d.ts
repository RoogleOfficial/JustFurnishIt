import React from 'react';
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
declare const PlansContainer: React.FC<PlansContainerProps>;
export default PlansContainer;
