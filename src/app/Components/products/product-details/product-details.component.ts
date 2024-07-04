import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { lehngacholiPage2 } from '../../../../assets/Data/Saree/lenghaCholiPage2';
import { AppState } from '../../../Store/AppState';
import { cartActions } from '../../../Store/Cart/cart.actions';
import { ProductServices } from '../../../Store/Product/ProductServices';
import { AddItemRequestInterface } from '../../../models/Requests/addItemRequest.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductReviewCardComponent } from './product-review-card/product-review-card.component';

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
  selectedSize!: string;
  reviews = [1, 2, 1];
  relatedProducts: any;
  product: any;
  productId!: number;
  quantity!: number;

  constructor(
    private router: Router,
    private productServices: ProductServices,
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
    console.log('selected Size ', this.selectedSize);
    const req: AddItemRequestInterface = {
      size: this.selectedSize,
      productId: this.product.productId,
      quantity: this.quantity,
    };
    this.store.dispatch(cartActions.addCartItemRequest({ reqData: req }));
    this.router.navigate(['cart']);
  }
}
