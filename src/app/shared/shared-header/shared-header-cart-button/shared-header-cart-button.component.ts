import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shared-header-cart-button',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './shared-header-cart-button.component.html',
  styleUrl: './shared-header-cart-button.component.scss'
})
export class SharedHeaderCartButtonComponent {

}
