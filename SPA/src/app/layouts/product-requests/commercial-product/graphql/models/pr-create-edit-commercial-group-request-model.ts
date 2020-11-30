import { Guid } from "guid-typescript";

export class CreateEditCommercialProductRequestModel {
    generic: string;
    brand: string;
    requestPriorityId: number;
    comment: string;
        
    constructor(values? : Partial <CreateEditCommercialProductRequestModel> ) {
        Object.assign(this, values);
    }
}

