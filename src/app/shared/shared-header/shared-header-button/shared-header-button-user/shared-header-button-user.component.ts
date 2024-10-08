import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
    MatDialog
} from '@angular/material/dialog';
import { LoginDialogComponent } from '../../../../features/login/login-dialog/login-dialog.component';
import { CreateAccountDialogComponent } from '../../../../features/create-account/create-account-dialog/create-account-dialog.component';

@Component({
    selector: 'app-shared-header-button-user',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        MatMenuModule
    ],
    templateUrl: './shared-header-button-user.component.html',
    styleUrl: './shared-header-button-user.component.scss'
})
export class SharedHeaderButtonUserComponent {

    constructor(private matDialog: MatDialog) {}

    /**
    * TODO: Remove the dependency on LoginDialogComponent and CreateAccountDialogComponent,
    * as the shared module should not depend on feature-specific modules.
    * Consider creating a core service to manage and access these components,
    * ensuring the shared module only relies on the core module. Or, make those features
    * shared.
    */
    openLoginDialog(): void {
        const dialogRef = this.matDialog.open(LoginDialogComponent, {
            width: '600px',
            autoFocus: false
        });
    }

    openCreateAccountDialog(): void {
        const dialogRef = this.matDialog.open(CreateAccountDialogComponent, {
            width: '600px',
            autoFocus: false
        });
    }
}
