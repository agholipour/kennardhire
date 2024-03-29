import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'product-requests',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent, 
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }
    // ,
    // {
    //   path: 'product-requests',
    //   loadChildren: './product-requests/product-requests.module#ProductRequestsModule'
    // }
  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false,
       enableTracing: false 
    })
  ],
  exports: [],
})
export class AppRoutingModule { }
