import { Guid } from 'guid-typescript';


export class CreateProductRequestModel  
{
    generic: string;
    brand: string;
    comment: string;
    requestPriorityId: number;

    
    constructor(values?: Partial<CreateProductRequestModel>) {
        Object.assign(this, values);
    }
}


export class UpdateProductRequestModel  
{
    id: Guid;
    generic: string;
    brand: string;
    comment: string;
    requestPriorityId: number;

    
    constructor(values?: Partial<UpdateProductRequestModel>) {
        Object.assign(this, values);
    }
}

