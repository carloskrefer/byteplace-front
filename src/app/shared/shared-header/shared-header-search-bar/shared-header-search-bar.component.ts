import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shared-header-search-bar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './shared-header-search-bar.component.html',
  styleUrl: './shared-header-search-bar.component.scss'
})
export class SharedHeaderSearchBarComponent {

}
