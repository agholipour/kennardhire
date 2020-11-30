import { GenericValidator } from "./generic-validator";
import { Observable, fromEvent, merge, Subject } from "rxjs";
import { ElementRef, ViewChildren, AfterViewInit } from "@angular/core";
import { FormGroup, FormControlName } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { OverlayRef } from "@angular/cdk/overlay";

export abstract class AbstractEdit implements AfterViewInit  {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string='';
  validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;
  displayMessage: { [key: string]: string } = {};
  editFormGroup: FormGroup;
  requestType: string;
  spinnerOverlay: OverlayRef;
  public requestDetailsLoaded: boolean = false;
  protected loading: boolean = true;
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable(); 

  constructor() {
  }

  public handleError(error): any {
    this.loading = false;
    this.errorMessageSubject.next(error);
    console.log(error);
  }

  abstract onSaveComplete(): void;

  abstract onRetrieved(data: any): void;

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable so we only need to subscribe once.
    merge(this.editFormGroup.valueChanges, ...controlBlurs)
    .pipe(debounceTime(800)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.editFormGroup);
    });
  }

  // Method to clear FormControl field value on clicking Clear button
  public clearField(formControlName: string) {
    if (this.editFormGroup.controls[formControlName]) {
      this.editFormGroup.controls[formControlName].setValue('');
    }
  }

  // Method to Hide spinner
  public hideSpinner() {
    if (this.spinnerOverlay) {
      // Hide Spinner
      this.spinnerOverlay.detach();
    }
  }
}