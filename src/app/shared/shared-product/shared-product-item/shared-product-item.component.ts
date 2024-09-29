import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductModel } from '../../../core/domain/product.model';

@Component({
  selector: 'app-shared-product-item',
  standalone: true,
  imports: [],
  templateUrl: './shared-product-item.component.html',
  styleUrl: './shared-product-item.component.scss'
})
export class SharedProductItemComponent implements OnInit, OnChanges {
    @Input() product: ProductModel | undefined;

    formattedPrice: string = '';

    ngOnInit() {
        this.updateFormattedPrice();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['product']) {
            this.updateFormattedPrice();
        }
    }

    private updateFormattedPrice() {
        if (this.product) {
            this.formattedPrice = (Math.round(this.product.price * 100) / 100).toFixed(2);
        } else {
            this.formattedPrice = '';
        }
    }
}
