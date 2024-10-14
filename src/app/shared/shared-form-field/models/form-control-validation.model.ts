import { ValidatorFn } from "@angular/forms";

export class FormControlValidationModel {
    validator!: ValidatorFn;
    validatorName!: string;
    errorMessage: string = '';
}
