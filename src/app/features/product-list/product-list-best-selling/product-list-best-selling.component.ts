import { Component } from '@angular/core';
import { SharedProductListComponent } from '../../../shared/shared-product/shared-product-list/shared-product-list.component';

@Component({
  selector: 'app-product-list-best-selling',
  standalone: true,
  imports: [
    SharedProductListComponent
  ],
  templateUrl: './product-list-best-selling.component.html',
  styleUrl: './product-list-best-selling.component.scss'
})
export class ProductListBestSellingComponent {

}
