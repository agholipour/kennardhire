import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import {SplitButtonModule} from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';


@NgModule({
  imports: [
        TableModule,
        SliderModule,
        SplitButtonModule,
        MultiSelectModule,
        DialogModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        InputTextModule,
        ProgressBarModule,
        TabViewModule,
        CodeHighlighterModule],
  exports: [TableModule,
            SliderModule,
            DialogModule,
            MultiSelectModule,
            ContextMenuModule,
            DropdownModule,
            ButtonModule,
            InputTextModule,
            ProgressBarModule,
            TabViewModule,
            CodeHighlighterModule,
            SplitButtonModule]
})
export class PrimeNgModule { }
