import { Dispatch } from 'redux';
import { CreateDTO, Designer } from '../Types/DesignerTypes';
export declare const getDesigner: (id: number) => Promise<import("axios").AxiosResponse<Designer, any>>;
export declare const updateDesigner: (designerId: Number, designerData: Designer) => Promise<void>;
export declare const createDesigner: (createDTO: CreateDTO) => Promise<any>;
export declare const getDesignerDetails: (userId: number, dispatch: Dispatch) => Promise<any>;
