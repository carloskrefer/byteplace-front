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
        SharedFormFieldPasswordComponent
    ],
    templateUrl: './create-account-dialog.component.html',
    styleUrl: './create-account-dialog.component.scss'
})
export class CreateAccountDialogComponent implements OnInit {
    passwordErrorMessage: string;
    isPasswordVisible: boolean;
    hasAuthFailed$!: Observable<boolean>;
    myForm!: FormGroup;
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
        this.myForm = new FormGroup({
            'billingAddress': new FormGroup({
                'postalCode': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
                'state': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
                'city': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
                'street': new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
                'number': new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
                'district': new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
            }),
            'shippingAddress': new FormGroup({
                'postalCode': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
                'state': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
                'city': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
                'street': new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
                'number': new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
                'district': new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
            })
        });
    }

    onSubmit(): void {
        this.formSubmitSubject$.next();
        this.updateErrorMessages();

        if (this.myForm.invalid) {
            // this.focusOnInvalidField();
            return;
        }

        this.sendLoginHttpRequest();
    }

    private updateErrorMessages(): void {
        this.updatePasswordErrorMessage();
    }

    // private focusOnInvalidField() {
    //     if (this.myForm.controls['login'].invalid) {
    //         this.renderer.selectRootElement('#login').focus();
    //     } else if (this.myForm.controls['password'].invalid) {
    //         this.renderer.selectRootElement('#password').focus();
    //     }
    // }

    private sendLoginHttpRequest() {
        const authRequestBody = new AuthRequestBodyModel(
            this.myForm.controls['login'].value,
            this.myForm.controls['password'].value
        );

        this.authService.sendAuthRequest(authRequestBody);
    }

    updatePasswordErrorMessage(): void {
        const passwordControl = this.myForm.controls['password'];

        if (!passwordControl.errors) {
            this.passwordErrorMessage = '';
        } else if (passwordControl.errors['required']) {
            this.passwordErrorMessage = 'A senha é obrigatória.';
        } else if (passwordControl.errors['minlength']) {
            this.passwordErrorMessage = 'Exigido pelo menos 3 caracteres.';
        }
    }

}
