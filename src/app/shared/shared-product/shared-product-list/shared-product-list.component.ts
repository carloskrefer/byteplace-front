import { Component, Input, OnInit } from '@angular/core';
import { SharedProductItemComponent } from '../shared-product-item/shared-product-item.component';
import { ProductModel } from '../../../core/domain/product.model';

@Component({
  selector: 'app-shared-product-list',
  standalone: true,
  imports: [
    SharedProductItemComponent
  ],
  templateUrl: './shared-product-list.component.html',
  styleUrl: './shared-product-list.component.scss'
})
export class SharedProductListComponent {
    @Input() title: string = '';
    @Input() products: ProductModel[] = [];

}
