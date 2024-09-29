import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shared-header-button-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './shared-header-button-user.component.html',
  styleUrl: './shared-header-button-user.component.scss'
})
export class SharedHeaderButtonUserComponent {

}
