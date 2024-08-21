import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductInterface } from '../../../models/Product/product.interface';
import { calculateDiscountPercent } from '../../../Util/utilFunctions';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductInterface;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.product = this.findDiscount(this.product);
  }

  navigate() {
    this.router.navigate([`product-details/${this.product.productId}`]);
  }

  findDiscount(product: ProductInterface) {
    const productClone = { ...product };
    const price = product.price;
    const discount = product.discountedPrice;
    productClone.discountPresent = calculateDiscountPercent(price, discount);
    return productClone;
  }
}
