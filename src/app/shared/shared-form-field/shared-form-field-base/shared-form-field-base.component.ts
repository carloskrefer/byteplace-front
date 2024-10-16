import { Component, input, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlConfiguration } from '../interfaces/form-control-configuration';
import { FormControlBuilder } from '../builders/form-control-builder';
import { FormControlValidationModel } from '../models/form-control-validation.model';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export type InputType = 'text' | 'password' | 'number';

@Component({
  selector: 'app-shared-form-field-base',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './shared-form-field-base.component.html',
  styleUrl: './shared-form-field-base.component.scss'
})
export class SharedFormFieldBaseComponent implements OnInit, OnDestroy {
    @Input() label: string = '';
    @Input() inputType: InputType = 'text';
    @Input() placeholder: string = '';
    @Input() hint: string = '';
    @Input() configuration!: FormControlConfiguration;
    @Input() validations!: FormControlValidationModel[];

    formControl!: FormControl;
    errorMessage: string = '';
    visibilityButtonShowsPassword: boolean = false;

    formSubmitSubscription!: Subscription;

    ngOnInit() {
        this.createFormControl();
        this.subscribeFormSubmitEvent();
    }

    private createFormControl() {
        this.formControl = new FormControlBuilder()
            .withValidators(this.validations.map(validation => validation.validator))
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

    getInputTypeBasedOnVisibility(): InputType {
        if (this.inputType == 'password' && this.visibilityButtonShowsPassword)
            return 'text';

        return this.inputType;
    }

    updateErrorMessage() {
        if (!this.formControl.errors) {
            this.errorMessage = '';
            return;
        }

        for (const validation of this.validations) {
            if (this.formControl.errors[validation.validatorName]) {
                this.errorMessage = validation.errorMessage;
                break;
            }
        }
    }

    ngOnDestroy() {
        this.formSubmitSubscription.unsubscribe();
    }
}
