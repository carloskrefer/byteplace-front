import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthRequestBodyModel } from '../../../core/models/auth-request-body.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe } from '@angular/common';
import { SharedMessageBarComponent } from '../../../shared/shared-message-bar/shared-message-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedFormFieldNameComponent } from '../../../shared/shared-form-field/shared-form-field-name/shared-form-field-name.component';
import { SharedFormFieldEmailComponent } from '../../../shared/shared-form-field/shared-form-field-email/shared-form-field-email.component';
import { SharedFormFieldPasswordComponent } from '../../../shared/shared-form-field/shared-form-field-password/shared-form-field-password.component';
import { SharedFormFieldPostalCodeComponent } from '../../../shared/shared-form-field/shared-form-field-postal-code/shared-form-field-postal-code.component';
import { SharedFormFieldCityComponent } from "../../../shared/shared-form-field/shared-form-field-city/shared-form-field-city.component";
import { SharedFormFieldStateComponent } from "../../../shared/shared-form-field/shared-form-field-state/shared-form-field-state.component";
import { SharedFormFieldStreetComponent } from "../../../shared/shared-form-field/shared-form-field-street/shared-form-field-street.component";
import { SharedFormFieldBuildingNumberComponent } from "../../../shared/shared-form-field/shared-form-field-building-number/shared-form-field-building-number.component";
import { SharedFormFieldDistrictComponent } from "../../../shared/shared-form-field/shared-form-field-district/shared-form-field-district.component";

@Component({
    selector: 'app-create-account-dialog',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    AsyncPipe,
    SharedMessageBarComponent,
    MatDialogModule,
    SharedFormFieldNameComponent,
    SharedFormFieldEmailComponent,
    SharedFormFieldPasswordComponent,
    SharedFormFieldPostalCodeComponent,
    SharedFormFieldCityComponent,
    SharedFormFieldStateComponent,
    SharedFormFieldStreetComponent,
    SharedFormFieldBuildingNumberComponent,
    SharedFormFieldDistrictComponent
],
    templateUrl: './create-account-dialog.component.html',
    styleUrl: './create-account-dialog.component.scss'
})
export class CreateAccountDialogComponent implements OnInit {
    passwordErrorMessage: string;
    isPasswordVisible: boolean;
    hasAuthFailed$!: Observable<boolean>;
    mainFormGroup!: FormGroup;
    billingAddressFormGroup!: FormGroup;
    shippingAddressFormGroup!: FormGroup;

    isAuthenticationLoading$!: Observable<boolean>;

    formSubmitSubject$: Subject<void>;
    formSubmit$: Observable<void>;

    constructor(
        private renderer: Renderer2,
        private authService: AuthService
    ) {
        this.passwordErrorMessage = '';
        this.isPasswordVisible = false;
        this.formSubmitSubject$ = new Subject<void>();
        this.formSubmit$ = this.formSubmitSubject$.asObservable();
    }

    ngOnInit(): void {
        this.configureForm();
        this.isAuthenticationLoading$ = this.authService.isLoading$;
        this.hasAuthFailed$ = this.authService.isLoadingFailure$;
    }

    private configureForm(): void {
        this.billingAddressFormGroup = new FormGroup({});
        this.shippingAddressFormGroup = new FormGroup({});

        this.mainFormGroup = new FormGroup({
            'billingAddress': this.billingAddressFormGroup,
            'shippingAddress': this.shippingAddressFormGroup
        });
    }

    onSubmit(): void {
        this.formSubmitSubject$.next();
        this.updateErrorMessages();

        if (this.mainFormGroup.invalid) {
            // this.focusOnInvalidField();
            return;
        }

        this.sendLoginHttpRequest();
    }

    private updateErrorMessages(): void {
        this.updatePasswordErrorMessage();
    }

    // private focusOnInvalidField() {
    //     if (this.mainFormGroup.controls['login'].invalid) {
    //         this.renderer.selectRootElement('#login').focus();
    //     } else if (this.mainFormGroup.controls['password'].invalid) {
    //         this.renderer.selectRootElement('#password').focus();
    //     }
    // }

    private sendLoginHttpRequest() {
        const authRequestBody = new AuthRequestBodyModel(
            this.mainFormGroup.controls['login'].value,
            this.mainFormGroup.controls['password'].value
        );

        this.authService.sendAuthRequest(authRequestBody);
    }

    updatePasswordErrorMessage(): void {
        const passwordControl = this.mainFormGroup.controls['password'];

        if (!passwordControl.errors) {
            this.passwordErrorMessage = '';
        } else if (passwordControl.errors['required']) {
            this.passwordErrorMessage = 'A senha é obrigatória.';
        } else if (passwordControl.errors['minlength']) {
            this.passwordErrorMessage = 'Exigido pelo menos 3 caracteres.';
        }
    }

}
