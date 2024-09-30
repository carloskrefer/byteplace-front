import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';

@Component({
    selector: 'app-shared-dialog-base',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './shared-dialog-base.component.html',
    styleUrl: './shared-dialog-base.component.scss'
})
export class SharedDialogBaseComponent {
    @Input() title: string = 'Caixa de diálogo';

    constructor(private dialogRef: MatDialogRef<SharedDialogBaseComponent>) {}

    onCloseDialog() {
        this.dialogRef.close();
    }

}
