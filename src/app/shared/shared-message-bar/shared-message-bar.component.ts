import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

type MessageType = 'info' | 'warn' | 'error';
type MaterialSymbolsIconName = 'info' | 'warning';

@Component({
  selector: 'app-shared-message-bar',
  standalone: true,
  imports: [
    NgClass,
    MatIcon
  ],
  templateUrl: './shared-message-bar.component.html',
  styleUrl: './shared-message-bar.component.scss'
})
export class SharedMessageBarComponent {
    @Input() showIcon: boolean;

    @Input() set messageType(type: MessageType) {
      this.setPropertiesForMessageType(type);
    }

    iconName: MaterialSymbolsIconName;
    cssClasses: string[];

    constructor() {
      this.showIcon = false;
      this.messageType = 'info';
      this.iconName = 'info';
      this.cssClasses = ['info', 'small-border'];
    }

    private setPropertiesForMessageType(messageType: string): void {
      switch (messageType) {
        case 'info': {
          this.iconName = 'info';
          this.cssClasses = ['info', 'small-border'];
          break;
        }
        case 'warn': {
          this.iconName = 'warning';
          this.cssClasses = ['warn', 'small-border'];
          break;
        }
        case 'error': {
          this.iconName = 'warning';
          this.cssClasses = ['error'];
          break;
        }
      }
    }

}
