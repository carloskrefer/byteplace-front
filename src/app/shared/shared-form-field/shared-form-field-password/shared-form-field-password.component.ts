import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlConfiguration } from '../interfaces/form-control-configuration';
import { Subscription } from 'rxjs';
import { FormControlBuilder } from '../builders/form-control-builder';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shared-form-field-password',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './shared-form-field-password.component.html',
  styleUrl: './shared-form-field-password.component.scss'
})
export class SharedFormFieldPasswordComponent {
    @Input() configuration!: FormControlConfiguration;

    formControl!: FormControl;
    errorMessage: string = '';
    isPasswordVisible: boolean = false;

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
          this.errorMessage = 'A senha é obrigatória.';
        } else if (this.formControl.errors['minlength']) {
          this.errorMessage = 'Exigido pelo menos 5 caracteres.';
        }
    }
}
