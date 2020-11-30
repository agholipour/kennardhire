import { Routes } from '@angular/router';
import { ProductRequestListComponent } from 'app/layouts/product-requests/list/product-request-list.component';
import { CommercialGroupProductRequestComponent } from '../product-requests/commercial-product/commercial-group-product-request.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'product-requests', component: ProductRequestListComponent },
    { path: 'product-requests/:id/edit', component: CommercialGroupProductRequestComponent }
];
