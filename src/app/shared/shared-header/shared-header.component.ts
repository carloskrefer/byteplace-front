import { Component } from '@angular/core';
import { SharedHeaderButtonHamburgerComponent } from './shared-header-button/shared-header-button-hamburger/shared-header-button-hamburger.component';
import { SharedHeaderSearchBarComponent } from './shared-header-search-bar/shared-header-search-bar.component';
import { SharedHeaderButtonCartComponent } from './shared-header-button/shared-header-button-cart/shared-header-button-cart.component';
import { SharedHeaderButtonFavoritesComponent } from './shared-header-button/shared-header-button-favorites/shared-header-button-favorites.component';
import { SharedHeaderButtonUserComponent } from './shared-header-button/shared-header-button-user/shared-header-button-user.component';

@Component({
    selector: 'app-shared-header',
    standalone: true,
    imports: [
        SharedHeaderButtonHamburgerComponent,
        SharedHeaderSearchBarComponent,
        SharedHeaderButtonFavoritesComponent,
        SharedHeaderButtonCartComponent,
        SharedHeaderButtonUserComponent
    ],
    templateUrl: './shared-header.component.html',
    styleUrl: './shared-header.component.scss'
})
export class SharedHeaderComponent {

}
