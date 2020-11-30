import { Guid } from "guid-typescript";


// GraphQL request model for Commercial Group Product Request Read operation
export class ProductRequestCommercialGroupModel
{
    id: Guid;
    generic: string;
    brand: string;
    comment: string;
    requestPriority: string;
    requestPriorityId: number;    

}
