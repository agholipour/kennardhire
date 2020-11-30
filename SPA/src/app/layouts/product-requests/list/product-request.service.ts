import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import 'rxjs/add/observable/of';
import { catchError, map } from "rxjs/operators";
import { GraphqlQueryNameConstants } from '../../../core/graphql/graphlql-query-name-constants';
import { BaseService } from "../../../core/services/base.service";
import { ProductRequestSearchGQL } from "./graphql/queries/product-request-query.gql";
import { ProductRequestListModel } from "./product-request-list";

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService extends BaseService {
  public refreshSubject: Subject<boolean> = new Subject<boolean>();
  public loadingSubject: Subject<boolean> = new Subject<boolean>();

  private requestsSubject = new BehaviorSubject<ProductRequestListModel[]>([]);
  productRequests$ : Observable<ProductRequestListModel[]>= this.requestsSubject.asObservable();
  
  productRequestInit$ = this.productRequestGqlService.fetch(null, {
      fetchPolicy: 'network-only'
    })
    .pipe(
      map(data => data.data[`${ GraphqlQueryNameConstants.ProductRequestList }`]),
      map(data => {
        // Response
        const response: ProductRequestListModel[] = [];
        if (!data) return response;
        data.forEach(element => {
        let productRequest = new ProductRequestListModel({ 
          id: element.id,
          generic:element.generic,
          brand: element.brand,
          requestPriority: element.requestPriority,
          requestPriorityId: element.requestPriorityId,
        });
        response.push(productRequest);        
      });
      return response;
    }),
      catchError(this.handleError),
    );

  initRequestSubject(requests: ProductRequestListModel[] ){
     this.requestsSubject.next(requests);
  }
     
  
  public static  createCommerciallyGroupProduct : string ='createCommercialGroupProduct';
  
  constructor(private productRequestGqlService: ProductRequestSearchGQL)
     {
    super();
  }

  addInsertedRowToproductRequests(newRequest): void{
    const productRequests= this.requestsSubject.getValue();

    productRequests.push(newRequest);
    this.requestsSubject.next(productRequests);

  }

  // This method will delete the product request row from 
  // the cached list
  deleteProductRequestFromList(id: Guid){
    // Retrieve PR list
    var result = this.requestsSubject.getValue();

    if (result) {
      // retrieve index for filter
      let index = result.findIndex(x => x.id == id);

      if (index !== -1) {
        result = result.filter((val, i) => i !== index);   
  
        // Update Subject 
        this.requestsSubject.next(result);
      }
    }
  }
 

  updateRowOnProductRequests(requestId:Guid, changes): void{
     const productRequests= this.requestsSubject.getValue();
     const index = productRequests.findIndex(request => request.id ==requestId)
     const newProductRequests = productRequests.slice(0);

     newProductRequests[index] = {
       ...productRequests[index],
       ...changes
     }

     this.requestsSubject.next(newProductRequests);

  }

  
  

  // Static method to get validation messages
  public static getValidationMessages(): any {
    return {
      requestPriorityId: {
        required: 'Request Priority is required.'
      },
      generic: {
        required: 'Product generic is required.',
        maxlength: 'Product generic cannot exceed 255 characters.'
      },
      brand: {
        required: 'Product brand is required.',
        maxlength: 'Product brand cannot exceed 40 characters.'
      },
      comment: {
        maxlength: 'Product comment cannot exceed 256 characters.'
      }
    }
  }
}