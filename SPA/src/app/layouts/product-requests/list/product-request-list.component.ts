import { ProductRequestService } from './product-request.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductRequestListModel } from 'app/layouts/product-requests/list/product-request-list';
import { Guid } from 'guid-typescript';
import { Table } from 'primeng/table';
import 'moment/locale/en-au';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { AbstractList } from 'app/shared/abstract-list';

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request-list.component.html',
  styleUrls: ['./product-request-list.component.scss']
})
export class ProductRequestListComponent extends AbstractList implements OnInit  {
  @ViewChild('dt') table: Table;
  productRequests : ProductRequestListModel[] =[
    {id:Guid.create(),brand:'test',generic:'test',requestPriority:'High',requestPriorityId:1}
  ];

  constructor(private _router: Router, 
    private productRequestService: ProductRequestService
  ) { 
      super('Requests');
    }
  
  public ngOnInit(): void {
     this.loading = true;
      this.productRequestService.productRequestInit$.pipe(
        take(1),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe((requests) => {
        this.productRequestService.initRequestSubject(requests);
      }),
    (err) => {
      this.handleError(err);
    };

    this.productRequestService.productRequests$.subscribe(requests => {
      this.onListRetrieved(requests);
    });
    
  // Product Request Table columns
  this.cols = [
    { field: 'generic', header: 'Generic', width: '25%' },
    { field: 'brand', header: 'Brand', width: '25%' },
    { field: 'requestPriority', header: 'Priority', width: '25%' },
    { field: 'rowStatus', header: '', width: '10%' }
   ];

  }

  // Method to handle edit for Product request
  onEditRequest(data) {
    if (data) {
      this._router.navigate(['product-requests', data.id,'edit']);
    }
  }  

 
  // Method on retrieval of Product list
  onListRetrieved(requests: any): void {
    this.productRequests.length = 0;
    this.productRequests = requests;
    requests.forEach(element => {
      this.configureActions(element);
    });

  }
  private configureActions(data: any): void {
      data.actions =  [
              { label:'Edit Request', icon: 'pi pi-user-edit',
               routerLink: [`${data.id}/${'edit'}`]},
          ];
  }

  // Method on Create of new Product Request
  onCreateRequest() {
    this._router.navigate(['product-requests', Guid.EMPTY.toString(), 'edit']);
  }

}