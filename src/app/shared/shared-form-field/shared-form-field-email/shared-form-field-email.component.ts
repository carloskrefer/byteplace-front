import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlConfiguration } from '../interfaces/FormControlConfiguration';
import { Subscription } from 'rxjs';
import { FormControlBuilder } from '../builders/form-control-builder';

@Component({
  selector: 'app-shared-form-field-email',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './shared-form-field-email.component.html',
  styleUrl: './shared-form-field-email.component.scss'
})
export class SharedFormFieldEmailComponent {
    @Input() configuration!: FormControlConfiguration;

    formControl!: FormControl;
    errorMessage: string = '';

    formSubmitSubscription!: Subscription;

    ngOnInit() {
        this.createFormControl();
        this.subscribeFormSubmitEvent();
    }

    private createFormControl() {
        this.formControl = new FormControlBuilder()
            .withValidators([Validators.required, Validators.minLength(5), Validators.email])
            .addToFormGroup(this.configuration.formGroup, this.configuration.name)
            .build();
    }

    private subscribeFormSubmitEvent() {
        this.formSubmitSubscription =
            this
                .configuration
                .formSubmit$
                .subscribe(() => this.onFormSubmit());
    }

    private onFormSubmit() {
        this.updateErrorMessage();
    }

    updateErrorMessage() {
        if (!this.formControl.errors) {
          this.errorMessage = '';
        } else if (this.formControl.errors['required']) {
          this.errorMessage = 'O e-mail é obrigatório.';
        } else if (this.formControl.errors['minlength']) {
          this.errorMessage = 'Exigido pelo menos 5 caracteres.';
        } else if (this.formControl.errors['email']) {
            this.errorMessage = 'O e-mail deve incluir o nome do seu usuário, o caractere "@" e o nome do provedor.';
        }
    }
}
