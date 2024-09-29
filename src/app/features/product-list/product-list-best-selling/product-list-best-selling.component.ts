import { Component, OnInit } from '@angular/core';
import { SharedProductListComponent } from '../../../shared/shared-product/shared-product-list/shared-product-list.component';
import { ProductModel } from '../../../core/domain/product.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-list-best-selling',
    standalone: true,
    imports: [
        SharedProductListComponent
    ],
    templateUrl: './product-list-best-selling.component.html',
    styleUrl: './product-list-best-selling.component.scss'
})
export class ProductListBestSellingComponent implements OnInit {

    products: ProductModel[] = [];

    ngOnInit() {
        // Remove after testing. These values should come from HTTP request.
        for (let i = 0; i < 15; i++) {
            let product = new ProductModel();
            product.id = i;
            product.title = 'Título produto ' + (i + 1);
            product.price = (i + 1) * 100;
            this.products.push(product);
        }
    }

}
