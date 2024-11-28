import React from "react";
import { DesignData, Measurement, PackageData, QuoteData, SubscribtionPlan } from "../../Types/EstimateQuotation";
interface Step4Props {
    quoteData: QuoteData;
    updateQuoteData: (section: keyof QuoteData, data: Partial<PackageData> | Partial<DesignData> | Partial<Measurement> | Partial<SubscribtionPlan> | string) => void;
}
declare const Step4: React.FC<Step4Props>;
export default Step4;
