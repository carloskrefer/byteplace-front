import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

export interface FormControlConfiguration {
    // FormGroup instance to which the FormControl will be added.
    formGroup: FormGroup;

    // Name used to register this FormControl within the FormGroup.
    name: string;

    // Observable that emits an event whenever the form is submitted.
    formSubmit$: Observable<void>;
}
