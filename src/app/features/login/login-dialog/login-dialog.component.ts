import { Component } from '@angular/core';
import { SharedDialogBaseComponent } from '../../../shared/shared-dialog-base/shared-dialog-base.component';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [SharedDialogBaseComponent],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {

}
