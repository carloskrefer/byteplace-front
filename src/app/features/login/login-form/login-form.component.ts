import { Component, Renderer2 } from '@angular/core';
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

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    AsyncPipe
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
    passwordErrorMessage: string;
    loginErrorMessage: string;
    isPasswordVisible: boolean;
    hasAuthFailed: boolean;
    hasAuthFailedSubscription$!: Subscription;
    myForm!: FormGroup;
    isAuthenticationLoading$!: Observable<boolean>;

    constructor(
        private renderer: Renderer2,
        private authService: AuthService
    ) {
      this.passwordErrorMessage = '';
      this.loginErrorMessage = '';
      this.isPasswordVisible = false;
      this.hasAuthFailed = false;
    }

    ngOnInit(): void {
      this.configureForm();
      this.isAuthenticationLoading$ = this.authService.isLoading$;

      this.hasAuthFailedSubscription$ =
        this.authService
            .isLoadingFailure$
            .subscribe(
                hasAuthFailed => this.hasAuthFailed = hasAuthFailed
            );
    }

    private configureForm(): void {
      this.myForm = new FormGroup({
        'login': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(3)])
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
      this.updateLoginErrorMessage();
      this.updatePasswordErrorMessage();
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

    updateLoginErrorMessage(): void {
      const loginControl = this.myForm.controls['login'];

      if (!loginControl.errors) {
        this.loginErrorMessage = '';
      } else if (loginControl.errors['required']) {
        this.loginErrorMessage = 'O login é obrigatório.';
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

    ngOnDestroy(): void {
        this.hasAuthFailedSubscription$.unsubscribe();
    }
}
