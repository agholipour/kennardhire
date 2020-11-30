import { Guid } from 'guid-typescript';
import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractEdit } from 'app/shared/abstract-edit';
import { GenericValidator } from 'app/shared/generic-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequestService } from 'app/layouts/product-requests/list/product-request.service';
import { ToastrService } from 'ngx-toastr';
import { CreateProductRequestModel, UpdateProductRequestModel } from './commercial-group-product-request';
import { CommercialGroupProductRequestService } from './commercial-group-product-request.service';
import { GraphqlQueryNameConstants } from 'app/core/graphql/graphlql-query-name-constants';


@Component({
  templateUrl: './commercial-group-product-request.component.html',
  styleUrls: ['./commercial-group-product-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommercialGroupProductRequestComponent extends AbstractEdit implements OnInit, AfterViewInit, OnDestroy {
  commercialProductRequest: CreateProductRequestModel;
  requestType: string;
  productRequestId: string;
       
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commercialProductRequestService: CommercialGroupProductRequestService,
    private productRequestService: ProductRequestService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef) {
    super();

    // Get Validation messages
    this.validationMessages = ProductRequestService.getValidationMessages();

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  // ngOnDestroy
  ngOnDestroy(): void {
   
    // Set Observers of LoadingSubject to empty array
    this.productRequestService.loadingSubject.observers = [];
  }

  // Initialise the component
  ngOnInit() {
    // Create a reactive form
    this.editFormGroup = this.fb.group({
      requestPriorityId: ['', [Validators.required]],
      generic: ['', [Validators.required, Validators.maxLength(255)]],
      brand: ['', [Validators.required, Validators.maxLength(40)]],
      comment: ['', [ Validators.maxLength(256)]]
    });
    this.route.params.subscribe(
      params => {
        this.productRequestId = params['id'];
        this.getProductRequestDetails(this.productRequestId);
    });
   
  }
    
  // ngAfterViewInit
  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  // Method to save Product Request details
  saveProductRequest(): void {
    try {
      // Check if the form is valid
      if (this.editFormGroup.valid) {
        // Check if the form is dirty
        if (this.editFormGroup.dirty) {
          
          // Get Product request
          if (this.productRequestId === Guid.EMPTY) {
            // Call method to create product request
            const productRequest: CreateProductRequestModel = { ...this.commercialProductRequest, ...this.editFormGroup.value };
            this.createProductRequest(productRequest);
          } else {
            const productRequest: UpdateProductRequestModel = { ...this.commercialProductRequest, ...this.editFormGroup.value };
            productRequest.id = Guid.parse(this.productRequestId);
            // Call method to update product request
            this.updateProductRequest(productRequest);
          }
        }
      } else {
        this.handleError('Please correct the validation errors.');
      }
    } catch(exception) {
  
      this.toastr.error('Something went wrong while saving Product Request details.');
    }
  }
  // Helper method on completing Save opertaion
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.editFormGroup.reset();

    // Navigate to lists page
    this.router.navigate(['/product-requests']);
  }

  // Helper method on retrieval of Product details
  onRetrieved(data: any): void {
    this.commercialProductRequest = data;
        
    // Update the data on the form
    this.editFormGroup.patchValue({
      generic: this.commercialProductRequest.generic,
      brand: this.commercialProductRequest.brand,
      comment: this.commercialProductRequest.comment,
      requestPriorityId: this.commercialProductRequest.requestPriorityId
       });
  }

  // Method to retrieve Product Request Details
  private getProductRequestDetails(id: string): void {
    // Call service to retrieve Product request
    this.commercialProductRequestService.getCommercialProductRequest(id).subscribe((response) => {
     
      // Display details on view
      this.displayProduct(response);

    }, (error) => {
      this.handleError(error);
    });
  }

  // Method to display product
  private displayProduct(product: any): void {
    if (this.editFormGroup) {
      // Reset form
      this.editFormGroup.reset();
    }

    // Call onRetrieved() to populate the form with details 
    this.onRetrieved(product);
  }

  // Method to create Product Request
  private createProductRequest(productRequest: CreateProductRequestModel) {
    // Call service method
    this.commercialProductRequestService.createCommercialProductRequest(productRequest).subscribe((result) => {
      // Get data from response for Product Request type
      let data =  result.data[GraphqlQueryNameConstants.CreateProductRequest];

      // Insert record to show in Product Requests grid
      this.productRequestService.addInsertedRowToproductRequests(data);

      // Show success message
      this.toastr.success(`Request Id: ${data.id}`, 'Saved Successfully');

      // Call method on Save complete operation
      this.onSaveComplete();

    }, (error: any) => {
      this.handleError(error);

    }); 
  }
  
  // Helper method to update Product Request
  private updateProductRequest(productRequest: UpdateProductRequestModel) {
    // Call service method
    this.commercialProductRequestService.updateCommercialProductRequest(productRequest).subscribe((result) => { 
      // Update Product Requests subject value to update record     
      this.productRequestService.updateRowOnProductRequests(productRequest.id, productRequest);
      // Show success message
      this.toastr.success('Product Request updated Successfully');

      // Call method on Save complete operation
      this.onSaveComplete();

    }, (error: any) => {
      this.handleError(error);
    }); 
  }

 
}
