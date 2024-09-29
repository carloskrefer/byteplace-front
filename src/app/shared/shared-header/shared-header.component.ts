import { Component } from '@angular/core';
import { SharedHeaderHamburgerButonComponent } from './shared-header-hamburger-buton/shared-header-hamburger-buton.component';
import { SharedHeaderSearchBarComponent } from './shared-header-search-bar/shared-header-search-bar.component';
import { SharedHeaderFavoritesButtonComponent } from './shared-header-favorites-button/shared-header-favorites-button.component';
import { SharedHeaderCartButtonComponent } from './shared-header-cart-button/shared-header-cart-button.component';

@Component({
    selector: 'app-shared-header',
    standalone: true,
    imports: [
        SharedHeaderHamburgerButonComponent,
        SharedHeaderSearchBarComponent,
        SharedHeaderFavoritesButtonComponent,
        SharedHeaderCartButtonComponent
    ],
    templateUrl: './shared-header.component.html',
    styleUrl: './shared-header.component.scss'
})
export class SharedHeaderComponent {

}
