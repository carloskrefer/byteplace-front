import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shared-header-button',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './shared-header-button.component.html',
  styleUrl: './shared-header-button.component.scss'
})
export class SharedHeaderButtonComponent {

}
