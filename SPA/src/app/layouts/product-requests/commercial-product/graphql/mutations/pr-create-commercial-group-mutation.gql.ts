import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { productRequestSummaryFragment } from 'app/core/graphql/fragments/product-request-summary.fragment.gql';
import { GraphqlQueryNameConstants } from 'app/core/graphql/graphlql-query-name-constants';

@Injectable({
    providedIn: 'root'
  })
export class CreateCommercialGroupProductRequestGQLMutation extends Mutation {
    document = gql `
    mutation($input: ProductRequestInput!) {
        ${ GraphqlQueryNameConstants.CreateProductRequest }(input: $input){
            ...productRequestSummaryFields
            }
        },
        ${productRequestSummaryFragment}
    `;
} 
