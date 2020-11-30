import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { productRequestSummaryFragment } from 'app/core/graphql/fragments/product-request-summary.fragment.gql';
import { GraphqlQueryNameConstants } from 'app/core/graphql/graphlql-query-name-constants';

@Injectable({
    providedIn: 'root'
  })
export class EditCommercialGroupProductRequestGQLMutation extends Mutation {
    document = gql `
    mutation($id: String, $input: ProductRequestInput!) {
        ${ GraphqlQueryNameConstants.UpdateProductRequest }(id: $id, input: $input){
            ...productRequestSummaryFields
            }
        },
        ${productRequestSummaryFragment}
    `;
}
