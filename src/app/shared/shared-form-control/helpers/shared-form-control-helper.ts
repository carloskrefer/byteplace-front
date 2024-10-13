import { FormControl, ValidatorFn, Validators } from "@angular/forms";

export class SharedFormControlHelper {

    createFormControl(validators: ValidatorFn[]): FormControl {
        return new FormControl(null, validators);
    }

}
