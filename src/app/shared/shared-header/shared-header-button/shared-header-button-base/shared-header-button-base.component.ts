import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shared-header-button-base',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './shared-header-button-base.component.html',
  styleUrl: './shared-header-button-base.component.scss'
})
export class SharedHeaderButtonBaseComponent {
    @Input() isOutlined: boolean = false;
    @Input() iconName: string = 'sentiment_very_dissatisfied';

}
