import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlConfiguration } from '../interfaces/form-control-configuration';
import { SharedFormFieldBaseComponent } from '../shared-form-field-base/shared-form-field-base.component';
import { FormControlValidationModel } from '../models/form-control-validation.model';

@Component({
  selector: 'app-shared-form-field-name',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SharedFormFieldBaseComponent
  ],
  templateUrl: './shared-form-field-name.component.html',
  styleUrl: './shared-form-field-name.component.scss'
})
export class SharedFormFieldNameComponent implements OnInit {
    @Input() configuration!: FormControlConfiguration;

    validations: FormControlValidationModel[] = [];

    ngOnInit() {
        this.createFormControlValidations();
    }

    createFormControlValidations() {
        this.validations.push({
            validator: Validators.required,
            validatorName: 'required',
            errorMessage: 'O nome é obrigatório.'
        });
        this.validations.push({
            validator: Validators.minLength(2),
            validatorName: 'minlength',
            errorMessage: 'Exigido pelo menos 2 caracteres.'
        });
    }
}
