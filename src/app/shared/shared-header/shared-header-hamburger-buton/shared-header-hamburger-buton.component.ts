import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-shared-header-hamburger-buton',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './shared-header-hamburger-buton.component.html',
    styleUrl: './shared-header-hamburger-buton.component.scss'
})
export class SharedHeaderHamburgerButonComponent {

}
