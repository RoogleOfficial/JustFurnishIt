import React from "react";
import { DesignData, Measurement, PackageData } from "../../Types/EstimateQuotation";
interface SubscribtionPlan {
    planType: "basic" | "intermediate" | "premium";
}
interface QuoteData {
    scope: any;
    designData: DesignData | null;
    srqFeet: Measurement;
    basic: PackageData;
    intermediate: PackageData;
    premium: PackageData;
    subscribtionPlan: SubscribtionPlan;
}
interface Step2Props {
    quoteData: QuoteData;
    updateQuoteData: (section: keyof QuoteData, data: Partial<PackageData> | Partial<DesignData> | Partial<Measurement> | string) => void;
}
declare const Step2: React.FC<Step2Props>;
export default Step2;
