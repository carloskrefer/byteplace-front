import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedHeaderButtonBaseComponent } from '../shared-header-button-base/shared-header-button-base.component';

@Component({
  selector: 'app-shared-header-button-favorites',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    SharedHeaderButtonBaseComponent
  ],
  templateUrl: './shared-header-button-favorites.component.html',
  styleUrl: './shared-header-button-favorites.component.scss'
})
export class SharedHeaderButtonFavoritesComponent {

}
