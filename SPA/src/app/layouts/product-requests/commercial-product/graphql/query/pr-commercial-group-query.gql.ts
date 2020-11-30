import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import gql from 'graphql-tag';
import { ProductRequestCommercialGroupModel } from "../models/pr-commercial-group-model";
import { GraphqlQueryNameConstants } from "app/core/graphql/graphlql-query-name-constants";

@Injectable({
    providedIn: 'root'
  })
export class GetCommercialGroupProductRequestGQLQuery extends Query<ProductRequestCommercialGroupModel> {
    static commercialGroupRequestDetails: string = 'productRequestCommercialGroupDetails';
    
    document = gql`
    query root($id: Guid)
    {           
        ${ GraphqlQueryNameConstants.ProductRequestDetails }(id: $id) {
            id,
            generic,
            brand,
            comment,
            requestPriority,
            requestPriorityId,
            
        }
    }`;
}
