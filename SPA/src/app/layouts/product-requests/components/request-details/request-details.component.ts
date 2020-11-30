import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ControlContainer, AbstractControl, FormGroup, FormBuilder } from "@angular/forms";
import { SelectOption } from "app/shared/select-option";

@Component({
    selector: 'app-request-details',
    templateUrl: './request-details.component.html',
    styleUrls: ['./request-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestDetailsComponent implements OnInit {
    @Input()
    public displayMessage: { [key: string]: string };
    @Input()
    public productRequestDetails: any;
    
    priorityOptions: SelectOption[] = [
      {label:'High',value:1},
      {label:'Medium',value:2},
      {label:'Low',value:3}];


    public productRequestFormGroup: FormGroup;
    
    // Property to access Generic Form Control
    get generic(): AbstractControl {
        return this.productRequestFormGroup.get('generic');
    }

    // Property to access Brand Form Control
    get brand(): AbstractControl {
        return this.productRequestFormGroup.get('brand');
    }

   
    constructor(public controlContainer: ControlContainer,
        public formBuilder: FormBuilder) {
    }

    ngOnInit() {
        // Get Parent FormGroup
        this.productRequestFormGroup = <FormGroup>this.controlContainer.control;
       
    }


    // Method to clear FormControl field value on clicking Clear button
    public clearField(formControlName: string) {
        if (this.productRequestFormGroup.controls[formControlName]) {
            this.productRequestFormGroup.controls[formControlName].setValue('');
        }
    }


   

}