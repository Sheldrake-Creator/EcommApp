import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from '../../../models/Product/product.interface';

@Component({
  selector: 'app-home-product-card',
  standalone: true,
  imports: [],
  templateUrl: './home-product-card.component.html',
  styleUrl: './home-product-card.component.scss',
})
export class HomeProductCardComponent {
  @Input() product!: ProductInterface;

  constructor(private router: Router) {}

  navigateToProductDetails(): void {
    const productId = this.product.productId;
    this.router.navigate([`/product-details/${productId}`]);
  }
}
