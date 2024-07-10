import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductInterface } from '../../../models/Product/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: ProductInterface;

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate([`product-details/${this.product.productId}`]);
  }
}
