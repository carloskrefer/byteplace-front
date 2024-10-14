import { Component, Input } from '@angular/core';
import { FormControlConfiguration } from '../interfaces/form-control-configuration';
import { FormControlValidationModel } from '../models/form-control-validation.model';
import { Validators } from '@angular/forms';
import { SharedFormFieldBaseComponent } from '../shared-form-field-base/shared-form-field-base.component';

@Component({
  selector: 'app-shared-form-field-postal-code',
  standalone: true,
  imports: [
    SharedFormFieldBaseComponent
  ],
  templateUrl: './shared-form-field-postal-code.component.html',
  styleUrl: './shared-form-field-postal-code.component.scss'
})
export class SharedFormFieldPostalCodeComponent {
    @Input() configuration!: FormControlConfiguration;

    validations: FormControlValidationModel[] = [];

    ngOnInit() {
        this.createFormControlValidations();
    }

    createFormControlValidations() {
        this.validations.push({
            validator: Validators.required,
            validatorName: 'required',
            errorMessage: 'O CEP é obrigatório.'
        });
        this.validations.push({
            validator: Validators.minLength(8),
            validatorName: 'minlength',
            errorMessage: 'O CEP deverá possuir 8 números.'
        });
        this.validations.push({
            validator: Validators.maxLength(8),
            validatorName: 'maxlength',
            errorMessage: 'O CEP deverá possuir 8 números.'
        });
    }
}
