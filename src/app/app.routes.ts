import { Routes } from '@angular/router';
import { ProductListBestSellingComponent } from './features/product-list/product-list-best-selling/product-list-best-selling.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: ProductListBestSellingComponent },
    { path: '**', redirectTo: '' }
];
