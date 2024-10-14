import { Component, Input } from '@angular/core';
import { FormControlConfiguration } from '../interfaces/form-control-configuration';
import { FormControlValidationModel } from '../models/form-control-validation.model';
import { Validators } from '@angular/forms';
import { SharedFormFieldBaseComponent } from '../shared-form-field-base/shared-form-field-base.component';

@Component({
  selector: 'app-shared-form-field-state',
  standalone: true,
  imports: [
    SharedFormFieldBaseComponent
  ],
  templateUrl: './shared-form-field-state.component.html',
  styleUrl: './shared-form-field-state.component.scss'
})
export class SharedFormFieldStateComponent {
    @Input() configuration!: FormControlConfiguration;

    validations: FormControlValidationModel[] = [];

    ngOnInit() {
        this.createFormControlValidations();
    }

    createFormControlValidations() {
        this.validations.push({
            validator: Validators.required,
            validatorName: 'required',
            errorMessage: 'O estado é obrigatório.'
        });
        this.validations.push({
            validator: Validators.minLength(2),
            validatorName: 'minlength',
            errorMessage: 'Exigido pelo menos 2 caracteres.'
        });
        this.validations.push({
            validator: Validators.maxLength(50),
            validatorName: 'maxlength',
            errorMessage: 'Ultrapassado o limite máximo de 50 caracteres.'
        });
    }
}
