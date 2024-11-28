import React from "react";
import { DesignDataI, PackageData, QuoteData } from "../../../Types/AddDesignModel";
interface Step1Props {
    nextStep: () => void;
    quoteData: QuoteData;
    updateQuoteData: (section: keyof QuoteData, data: Partial<PackageData> | Partial<DesignDataI> | string) => void;
}
declare const Step1: React.FC<Step1Props>;
export default Step1;
