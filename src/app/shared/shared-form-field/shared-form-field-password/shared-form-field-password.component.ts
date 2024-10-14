import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlConfiguration } from '../interfaces/form-control-configuration';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControlValidationModel } from '../models/form-control-validation.model';
import { SharedFormFieldBaseComponent } from '../shared-form-field-base/shared-form-field-base.component';

@Component({
  selector: 'app-shared-form-field-password',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    SharedFormFieldBaseComponent
  ],
  templateUrl: './shared-form-field-password.component.html',
  styleUrl: './shared-form-field-password.component.scss'
})
export class SharedFormFieldPasswordComponent {
    @Input() configuration!: FormControlConfiguration;

    validations: FormControlValidationModel[] = [];

    ngOnInit() {
        this.createFormControlValidations();
    }

    createFormControlValidations() {
        this.validations.push({
            validator: Validators.required,
            validatorName: 'required',
            errorMessage: 'A senha é obrigatória.'
        });
        this.validations.push({
            validator: Validators.minLength(3),
            validatorName: 'minlength',
            errorMessage: 'Exigido pelo menos 3 caracteres.'
        });
    }
}
