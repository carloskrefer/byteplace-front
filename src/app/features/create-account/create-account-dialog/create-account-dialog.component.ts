import { Component } from '@angular/core';
import { SharedDialogBaseComponent } from '../../../shared/shared-dialog-base/shared-dialog-base.component';
import { CreateAccountFormComponent } from '../create-account-form/create-account-form.component';

@Component({
  selector: 'app-create-account-dialog',
  standalone: true,
  imports: [
    SharedDialogBaseComponent,
    CreateAccountFormComponent
],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.scss'
})
export class CreateAccountDialogComponent {

}
