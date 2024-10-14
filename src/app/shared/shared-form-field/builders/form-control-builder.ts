import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { FormControlConfiguration } from "../interfaces/form-control-configuration";

export class FormControlBuilder {
    private controlName: string = '';
    private validators: ValidatorFn[] = [];
    private initialValue: any = '';
    private formGroup: FormGroup | undefined = undefined;

    withValidators(validators: ValidatorFn[]): FormControlBuilder {
        this.validators = validators;
        return this;
    }

    withInitialValue(value: any): FormControlBuilder {
        this.initialValue = value;
        return this;
    }

    addToFormGroup(formGroup: FormGroup, controlName: string): FormControlBuilder {
        this.formGroup = formGroup;
        this.controlName = controlName;
        return this;
    }

    build(): FormControl {
        const formControl = new FormControl(this.initialValue, this.validators);

        if (this.formGroup && this.controlName)
            this.formGroup.addControl(this.controlName, formControl);

        return formControl;
    }
}
