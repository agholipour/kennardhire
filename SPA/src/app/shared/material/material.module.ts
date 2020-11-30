import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
    imports: [ 
        MatMenuModule,
        MatTooltipModule,
        MatAutocompleteModule, 
        MatSelectModule,
        MatChipsModule, 
        MatExpansionModule, 
        DragDropModule, 
        MatToolbarModule, 
        MatButtonModule, 
        MatInputModule, 
        MatIconModule, 
        MatCardModule, 
        MatProgressSpinnerModule, 
        MatListModule, 
        MatSidenavModule, 
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatStepperModule
    ],
    exports: [ 
        MatMenuModule,
        MatTooltipModule,
        MatAutocompleteModule, 
        MatSelectModule,
        MatChipsModule, 
        MatExpansionModule, 
        DragDropModule, 
        MatToolbarModule, 
        MatButtonModule, 
        MatInputModule, 
        MatIconModule,
        MatCardModule, 
        MatProgressSpinnerModule, 
        MatListModule, 
        MatSidenavModule, 
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatStepperModule
    ]
})
export class MaterialModule { } 