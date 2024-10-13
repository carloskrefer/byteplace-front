import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable, Subscription } from 'rxjs';
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

@Component({
  selector: 'app-create-account-form',
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
    MatDialogModule
  ],
  templateUrl: './create-account-form.component.html',
  styleUrl: './create-account-form.component.scss'
})
export class CreateAccountFormComponent implements OnInit {
    passwordErrorMessage: string;
    nameErrorMessage: string
    emailErrorMessage: string;
    isPasswordVisible: boolean;
    hasAuthFailed$!: Observable<boolean>;
    myForm!: FormGroup;
    isAuthenticationLoading$!: Observable<boolean>;

    constructor(
        private renderer: Renderer2,
        private authService: AuthService
    ) {
      this.passwordErrorMessage = '';
      this.emailErrorMessage = '';
      this.nameErrorMessage = '';
      this.isPasswordVisible = false;
    }

    ngOnInit(): void {
      this.configureForm();
      this.isAuthenticationLoading$ = this.authService.isLoading$;
      this.hasAuthFailed$ = this.authService.isLoadingFailure$;
    }

    private configureForm(): void {
      this.myForm = new FormGroup({
        'login':    new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(3)]),
        'name':     new FormControl(null, [Validators.required, Validators.maxLength(250), Validators.minLength(2)]),
        'billingAddress': new FormGroup({
            'postalCode':   new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
            'state':        new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
            'city':         new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
            'street':       new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
            'number':       new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
            'district':     new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
        }),
        'shippingAddress': new FormGroup({
            'postalCode':   new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
            'state':        new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
            'city':         new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
            'street':       new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
            'number':       new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
            'district':     new FormControl(null, [Validators.minLength(2), Validators.maxLength(250)]),
        })
      });
    }

    onSubmit(): void {
      this.updateErrorMessages();

      if (this.myForm.invalid) {
        this.focusOnInvalidField();
        return;
      }

      this.sendLoginHttpRequest();
    }

    private updateErrorMessages(): void {
      this.updateEmailErrorMessage();
      this.updatePasswordErrorMessage();
      this.updateNameErrorMessage();
    }

    private focusOnInvalidField() {
      if (this.myForm.controls['login'].invalid) {
        this.renderer.selectRootElement('#login').focus();
      } else if (this.myForm.controls['password'].invalid) {
        this.renderer.selectRootElement('#password').focus();
      }
    }

    private sendLoginHttpRequest() {
      const authRequestBody = new AuthRequestBodyModel(
        this.myForm.controls['login'].value,
        this.myForm.controls['password'].value
      );

      this.authService.sendAuthRequest(authRequestBody);
    }

    updateEmailErrorMessage(): void {
      const loginControl = this.myForm.controls['login'];

      if (!loginControl.errors) {
        this.emailErrorMessage = '';
      } else if (loginControl.errors['required']) {
        this.emailErrorMessage = 'O login é obrigatório.';
      }
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

    updateNameErrorMessage(): void {
        const nameControl = this.myForm.controls['name'];

        if (!nameControl.errors) {
          this.nameErrorMessage = '';
        } else if (nameControl.errors['required']) {
          this.nameErrorMessage = 'O nome completo é obrigatório.';
        } else if (nameControl.errors['minlength']) {
          this.nameErrorMessage = 'Exigido pelo menos 2 caracteres.';
        }
      }

}
