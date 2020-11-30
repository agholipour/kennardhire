import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
 

/* Module Imports */
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { GraphQLModule } from './graphql.module';
import { AppInjector } from './app-injector.service';
import { ToastrModule } from 'ngx-toastr';
import { RequestDetailsComponent } from './layouts/product-requests/components/request-details/request-details.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    GraphQLModule,
    ToastrModule.forRoot()

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
   // https://devblogs.microsoft.com/premier-developer/angular-how-to-simplify-components-with-typescript-inheritance/#comment-116
   constructor(injector: Injector) { AppInjector.setInjector(injector); }
 }
