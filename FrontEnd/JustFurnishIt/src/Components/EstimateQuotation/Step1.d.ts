import React from "react";
import { DesignData, PackageData, QuoteData } from "../../Types/EstimateQuotation";
interface Step1Props {
    quoteData: QuoteData;
    updateQuoteData: (section: keyof QuoteData, data: Partial<PackageData> | Partial<DesignData> | string) => void;
}
declare const Step1: React.FC<Step1Props>;
export default Step1;
