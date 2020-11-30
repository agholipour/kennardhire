import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomisedPanelComponent } from 'app/layouts/product-requests/components/customised-panel/customised-panel.component';
import { CommercialGroupProductRequestComponent } from 'app/layouts/product-requests/commercial-product/commercial-group-product-request.component';
import { ProductRequestListComponent } from '../product-requests/list/product-request-list.component';
import { RequestDetailsComponent } from '../product-requests/components/request-details/request-details.component';
import { ActionButtonsComponent } from '../product-requests/components/action-buttons/action-buttons.component';
import { GetCommercialGroupProductRequestGQLQuery } from '../product-requests/commercial-product/graphql/query/pr-commercial-group-query.gql';
import { CreateCommercialGroupProductRequestGQLMutation } from '../product-requests/commercial-product/graphql/mutations/pr-create-commercial-group-mutation.gql';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes)
  ],
  providers: [
    GetCommercialGroupProductRequestGQLQuery,
    CreateCommercialGroupProductRequestGQLMutation
  ],

  declarations: [
    DashboardComponent,
    ActionButtonsComponent,
    CustomisedPanelComponent,
    CommercialGroupProductRequestComponent,
    RequestDetailsComponent,
    ProductRequestListComponent
   
  ]


})
export class AdminLayoutModule {}
