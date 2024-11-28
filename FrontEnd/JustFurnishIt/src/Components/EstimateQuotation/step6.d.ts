import React from "react";
import { DesignData, Measurement, PackageData, QuoteData } from "../../Types/EstimateQuotation";
interface Step6Props {
    quoteData: QuoteData;
    updateQuoteData: (section: keyof QuoteData, data: Partial<PackageData> | Partial<DesignData> | Partial<Measurement> | string) => void;
}
declare const Step6: React.FC<Step6Props>;
export default Step6;
