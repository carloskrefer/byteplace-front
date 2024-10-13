import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlConfiguration } from '../interfaces/FormControlConfiguration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-form-field-name',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './shared-form-field-name.component.html',
  styleUrl: './shared-form-field-name.component.scss'
})
export class SharedFormFieldNameComponent implements OnInit {
    @Input() configuration!: FormControlConfiguration;

    formControl!: FormControl;
    errorMessage: string = '';

    formSubmitSubscription!: Subscription;

    ngOnInit() {
        this.createFormControl();
        this.addControlInFormGroup();
        this.subscribeFormSubmitEvent();
    }

    private createFormControl() {
        this.formControl = new FormControl(null, [Validators.required, Validators.email]);
    }

    private addControlInFormGroup() {
        this.configuration.formGroup.addControl(
            this.configuration.name,
            this.formControl
        );
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
          this.errorMessage = 'O nome completo é obrigatório.';
        } else if (this.formControl.errors['minlength']) {
          this.errorMessage = 'Exigido pelo menos 2 caracteres.';
        }
    }
}
