import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedHeaderComponent } from '../shared-header/shared-header.component';

@Component({
    selector: 'app-shared-page',
    standalone: true,
    imports: [
        MatSidenavModule,
        SharedHeaderComponent
    ],
    templateUrl: './shared-page.component.html',
    styleUrl: './shared-page.component.scss'
})
export class SharedPageComponent {

}
