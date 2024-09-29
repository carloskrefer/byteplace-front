import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shared-header-favorites-button',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './shared-header-favorites-button.component.html',
  styleUrl: './shared-header-favorites-button.component.scss'
})
export class SharedHeaderFavoritesButtonComponent {

}
