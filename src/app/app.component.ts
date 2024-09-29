import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedPageComponent } from './shared/shared-page/shared-page.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        SharedPageComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'byteplace-front';
}
