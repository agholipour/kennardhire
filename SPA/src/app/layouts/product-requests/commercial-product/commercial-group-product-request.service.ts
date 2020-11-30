import { Injectable } from "@angular/core";
import { BaseService } from "app/core/services/base.service";
import { Observable } from "rxjs";
import { Guid } from "guid-typescript";
import { map, catchError, shareReplay } from "rxjs/operators";
import { CreateProductRequestModel, UpdateProductRequestModel } from "./commercial-group-product-request";
import { GetCommercialGroupProductRequestGQLQuery } from "./graphql/query/pr-commercial-group-query.gql";
import { ProductRequestCommercialGroupModel } from "./graphql/models/pr-commercial-group-model";
import { CreateEditCommercialProductRequestModel } from "./graphql/models/pr-create-edit-commercial-group-request-model";
import { CreateCommercialGroupProductRequestGQLMutation } from "./graphql/mutations/pr-create-commercial-group-mutation.gql";
import { EditCommercialGroupProductRequestGQLMutation } from "./graphql/mutations/pr-edit-commercial-group-mutation.gql";
import { GraphqlQueryNameConstants } from "app/core/graphql/graphlql-query-name-constants";


@Injectable({
    providedIn: 'root'
})
export class CommercialGroupProductRequestService extends BaseService {
        
    constructor(
        private getCommercialProductRequestGroupGQLService: GetCommercialGroupProductRequestGQLQuery,
        private createCommercialProductRequestGqlService: CreateCommercialGroupProductRequestGQLMutation,
        private editCommercialProductRequestGqlService: EditCommercialGroupProductRequestGQLMutation) {
        super();
    }

    // Method to retrieve Commercial Product Request
    public getCommercialProductRequest(id: string): Observable<CreateProductRequestModel> {
        if (id === Guid.EMPTY) {
            return Observable.of(this.initializeCommercialProductRequest());
        } else {
            return this.getCommercialProductRequestGroupGQLService.fetch({id: id}, {
                fetchPolicy: 'network-only'
            })
            .pipe(
                map(data => {
                    // Response
                    const response: ProductRequestCommercialGroupModel = data.data[`${ GraphqlQueryNameConstants.ProductRequestDetails }`];

                    // Map response to View model
                    return this.mapRequestDetailsToViewModel(response);
                }),
                catchError(this.handleError),
                shareReplay(1)
            );
        };
    }

    // Method to create new Commercial Product Request
    public createCommercialProductRequest(commercialProductRequest: CreateProductRequestModel): Observable<any> {
        // Map View Model to Request Object
        var input = this.mapViewModelToRequestObject(commercialProductRequest);

        // Call GraphQL Mutation for Commercial product request
        return this.createCommercialProductRequestGqlService.mutate({
            input: input
        });
    }

    // Method to create new Commercial Product Request
    public updateCommercialProductRequest(commercialProductRequest: UpdateProductRequestModel): Observable<any> {
        // Get product request id
        const id: string = commercialProductRequest.id.toString();

        // Map View Model to Request Object
        var input = this.mapViewModelToRequestObject(commercialProductRequest);

        // Call GraphQL Mutation for Commercial Product Request
        return this.editCommercialProductRequestGqlService.mutate({
            id, input: input
        });
    }

    // Method to initialize Commercial Product request
    public initializeCommercialProductRequest(): CreateProductRequestModel {
        // Return an initialized object
        return {
            generic: '',
            brand: '',
            comment: '',
            requestPriorityId: null,
        };
    }

    // Helper method to map Request details to ViewModel
    private mapRequestDetailsToViewModel(response: ProductRequestCommercialGroupModel): CreateProductRequestModel {
       
        
        return new CreateProductRequestModel({
            generic: response.generic,
            brand: response.brand,
            comment: response.comment,
            requestPriorityId: response.requestPriorityId
        });
    }

    // map view model to request object
    private mapViewModelToRequestObject(commercialProductRequest: CreateProductRequestModel) {
             
        let requestObject = new CreateEditCommercialProductRequestModel({
            brand: commercialProductRequest.brand,
            comment: commercialProductRequest.comment,
            generic: commercialProductRequest.generic,
            requestPriorityId: commercialProductRequest.requestPriorityId,
        });

        console.log('RequestModel:', requestObject);
        return requestObject;
    }
}