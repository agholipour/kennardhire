import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  imports: [
    CommonModule, 
    MaterialModule,
    FlexLayoutModule, 
    PrimeNgModule, 
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    OverlayModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    PrimeNgModule, 
    NgbModule, 
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class SharedModule { }