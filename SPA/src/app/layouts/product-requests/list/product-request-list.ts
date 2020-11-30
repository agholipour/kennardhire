import { Guid } from "guid-typescript";

export interface IProductRequest {
    id: Guid;
    generic: string;
    brand: string;
    requestPriorityId: number;
}

export class ProductRequestListModel implements IProductRequest {
    id: Guid;
    generic: string;
    brand: string;
    requestPriority: string;
    requestPriorityId: number;
    
    constructor(values?: Partial<ProductRequestListModel>
        ) {
        Object.assign(this,values);
    }
    
  
}