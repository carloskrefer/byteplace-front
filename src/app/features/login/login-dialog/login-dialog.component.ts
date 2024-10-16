import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedDialogBaseComponent } from '../../../shared/shared-dialog-base/shared-dialog-base.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SharedMessageBarComponent } from '../../../shared/shared-message-bar/shared-message-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthRequestBodyModel } from '../../../core/models/auth-request-body.model';
import { SharedFormFieldEmailComponent } from '../../../shared/shared-form-field/shared-form-field-email/shared-form-field-email.component';
import { SharedFormFieldPasswordComponent } from '../../../shared/shared-form-field/shared-form-field-password/shared-form-field-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    SharedDialogBaseComponent,
    AsyncPipe,
    MatProgressSpinnerModule,
    SharedMessageBarComponent,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    SharedFormFieldEmailComponent,
    SharedFormFieldPasswordComponent
],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent implements OnInit, OnDestroy {
    hasAuthSucceeded$: Observable<boolean> = new Observable<false>;
    hasAuthSucceededSubscription!: Subscription;

    isAuthLoading$: Observable<boolean> = new Observable<false>;
    hasAuthFailed$: Observable<boolean> = new Observable<false>;

    myForm!: FormGroup;

    formSubmitSubject$: Subject<void> = new Subject<void>();;
    formSubmit$!: Observable<void>;

    constructor(
        private authService: AuthService,
        private dialogRef: MatDialogRef<SharedDialogBaseComponent>,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.setObservables();
        this.subscribeToAuthSuccess();
        this.configureForm();
    }

    private setObservables() {
        this.hasAuthSucceeded$ = this.authService.isLoadingSuccess$;
        this.isAuthLoading$ = this.authService.isLoading$;
        this.hasAuthFailed$ = this.authService.isLoadingFailure$;

        this.formSubmit$ = this.formSubmitSubject$.asObservable();
    }

    private subscribeToAuthSuccess() {
        this.hasAuthSucceededSubscription =
            this
                .hasAuthSucceeded$
                .subscribe(hasAuthSucceeded => {
                    if (hasAuthSucceeded)
                        this.onAuthSuccess();
        });
    }

    private configureForm(): void {
        this.myForm = new FormGroup({});
    }

    onAuthSuccess() {
        this.showSuccessSnackbar();
        this.onCloseDialog();
    }

    showSuccessSnackbar() {
        this.snackbar.open('Login realizado com sucesso!', "Ok", {duration: 5000, verticalPosition: 'top'})
    }

    onCloseDialog() {
        this.dialogRef.close();
    }

    ngOnDestroy() {
        this.hasAuthSucceededSubscription.unsubscribe();
    }

    onSubmit() {
        this.formSubmitSubject$.next();

        if (this.myForm.invalid)
            return;

        this.sendLoginHttpRequest();
    }

    private sendLoginHttpRequest() {
        const authRequestBody = new AuthRequestBodyModel(
            this.myForm.controls['email'].value,
            this.myForm.controls['password'].value
        );

        this.authService.sendAuthRequest(authRequestBody);
    }
}
