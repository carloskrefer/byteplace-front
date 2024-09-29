import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedHeaderButtonBaseComponent } from '../shared-header-button-base/shared-header-button-base.component';

@Component({
  selector: 'app-shared-header-button-cart',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    SharedHeaderButtonBaseComponent
  ],
  templateUrl: './shared-header-button-cart.component.html',
  styleUrl: './shared-header-button-cart.component.scss'
})
export class SharedHeaderButtonCartComponent {

}
