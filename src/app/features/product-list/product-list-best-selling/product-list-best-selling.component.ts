import { Component, OnInit } from '@angular/core';
import { SharedProductListComponent } from '../../../shared/shared-product/shared-product-list/shared-product-list.component';
import { ProductModel } from '../../../core/domain/product.model';
import { Observable, Subscription } from 'rxjs';
import { ProductListBestSellingService } from './services/product-list-best-selling.service';

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

    productsSubscription!: Subscription;

    constructor(private productService: ProductListBestSellingService) {}

    ngOnInit() {
        this.productService.sendGetAllProductsRequest();
        this.productService.products$.subscribe(
            products => this.products = products
        );
    }

    ngOnDestroy() {
        this.productsSubscription.unsubscribe();
    }

}
