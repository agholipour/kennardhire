import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {
    public productRequestFormGroup: FormGroup;

    @Output()
    onSaveProductRequest = new EventEmitter<string>();

    constructor(public controlContainer: ControlContainer) {
    }

    ngOnInit() {
        // Get Parent Form group
        this.productRequestFormGroup = <FormGroup>this.controlContainer.control;
    }

    // Method to call Parent components Save Product Request method  
    public saveProductRequest(action: string) {
        this.onSaveProductRequest.emit(action);
    }
}