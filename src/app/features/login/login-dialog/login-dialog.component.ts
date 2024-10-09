import { Component } from '@angular/core';
import { SharedDialogBaseComponent } from '../../../shared/shared-dialog-base/shared-dialog-base.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-create-account-dialog',
  standalone: true,
  imports: [
    SharedDialogBaseComponent,
    LoginFormComponent,
    AsyncPipe
],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
    hasAuthSucceeded$: Observable<boolean> = new Observable<false>;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
      this.hasAuthSucceeded$ = this.authService.isLoadingSuccess$;
    }
}
