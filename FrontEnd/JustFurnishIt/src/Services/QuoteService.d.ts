import { Quote } from "../Types/EstimateQuotation";
export declare const getQuotesByDesignId: (designId: string | undefined) => Promise<any>;
export declare const createQuote: (quoteData: Quote) => Promise<void>;
export declare const updateQuote: (id: String, quoteData: Quote) => Promise<void>;
