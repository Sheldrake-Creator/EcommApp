import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { ProductReviewCardComponent } from './product-review-card/product-review-card.component';

import { ProductCardComponent } from '../product-card/product-card.component';

import { ActivatedRoute, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { lehngacholiPage2 } from '../../../../assets/Data/Saree/lenghaCholiPage2';
import { AppState } from '../../../Store/AppState';
import { CartService } from '../../../Store/Cart/cart.services';
import { ProductServices } from '../../../Store/Product/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  // ProductReviewCardComponent,StarRatingComponent
  imports: [
    MatRadioModule,
    FormsModule,
    CommonModule,
    MatProgressBarModule,
    ProductCardComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  selectedSize: any;
  reviews = [1, 2, 1];
  relatedProducts: any;
  product: any;
  productId: any;

  constructor(
    private router: Router,
    private productServices: ProductServices,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.relatedProducts = lehngacholiPage2;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productServices.findProductsById(id);

    this.store.pipe(select((store) => store.product)).subscribe((product) => {
      this.product = product?.product;
      console.log('store data ', product.product);
    });
  }

  handleAddToCart() {
    console.log('selcted Size ', this.selectedSize);
    const data = { size: this.selectedSize, productId: this.productId };
    this.cartService.getCart();
    this.cartService.addItemToCart(Number(data));

    this.router.navigate(['cart']);
  }
}
