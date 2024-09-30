import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
    MatDialog
} from '@angular/material/dialog';
import { LoginDialogComponent } from '../../../../features/login/login-dialog/login-dialog.component';

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

    openDialog(): void {
        const dialogRef = this.matDialog.open(LoginDialogComponent, {
            width: '600px',
            autoFocus: false
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     if (result !== undefined) {
        //         this.animal.set(result);
        //     }
        // });
    }
}
