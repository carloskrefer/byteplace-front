import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlConfiguration } from '../interfaces/form-control-configuration';
import { SharedFormFieldBaseComponent } from "../shared-form-field-base/shared-form-field-base.component";
import { FormControlValidationModel } from '../models/form-control-validation.model';

@Component({
  selector: 'app-shared-form-field-email',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SharedFormFieldBaseComponent
],
  templateUrl: './shared-form-field-email.component.html',
  styleUrl: './shared-form-field-email.component.scss'
})
export class SharedFormFieldEmailComponent implements OnInit {
    @Input() configuration!: FormControlConfiguration;

    validations: FormControlValidationModel[] = [];

    ngOnInit() {
        this.createFormControlValidations();
    }

    createFormControlValidations() {
        this.validations.push({
            validator: Validators.required,
            validatorName: 'required',
            errorMessage: 'O e-mail é obrigatório.'
        });
        this.validations.push({
            validator: Validators.minLength(5),
            validatorName: 'minlength',
            errorMessage: 'Exigido pelo menos 5 caracteres.'
        });
        this.validations.push({
            validator: Validators.email,
            validatorName: 'email',
            errorMessage: 'O e-mail deve incluir o nome do seu usuário, o caractere "@" e o nome do provedor.'
        });
        this.validations.push({
            validator: Validators.maxLength(50),
            validatorName: 'maxlength',
            errorMessage: 'Ultrapassado o limite máximo de 50 caracteres.'
        });
    }
}
