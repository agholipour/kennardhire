import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import { GraphqlQueryNameConstants } from "app/core/graphql/graphlql-query-name-constants";
import gql from "graphql-tag";
import { IProductRequest } from "../../product-request-list";

export interface IProductRequestListResponse {
  productRequests: IProductRequest[];
}

@Injectable({
    providedIn: 'root',
  })
  export class ProductRequestSearchGQL extends Query<IProductRequestListResponse> {
    document = gql`
    query root
    {           
      ${ GraphqlQueryNameConstants.ProductRequestList } {
        id,
        requestPriority,
        requestPriorityId,
        brand,
        generic
      }
    }`;

}