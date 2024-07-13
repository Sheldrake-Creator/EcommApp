import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { LehengaCholi } from '../../../../assets/Data/Women/lehengaCholi';
import { AppState } from '../../../Store/AppState';
import { cartActions } from '../../../Store/Cart/cart.actions';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { productActions } from '../../../Store/Product/product.action';
import {
  selectIsLoading,
  selectProduct,
} from '../../../Store/Product/product.reducer';
import { selectCurrentUser } from '../../../Store/selectors';
import { ProductInterface } from '../../../models/Product/product.interface';
import { AddItemRequestInterface } from '../../../models/Requests/addItemRequest.interface';
import { CurrentUserInterface } from '../../../models/User/currentUser.interface';
import { StarRatingComponent } from '../../star-rating/star-rating.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductReviewCardComponent } from './product-review-card/product-review-card.component';

@Component({
  selector: 'app-product-details',
  standalone: true,

  imports: [
    MatRadioModule,
    FormsModule,
    CommonModule,
    MatProgressBarModule,
    ProductCardComponent,
    ProductReviewCardComponent,
    StarRatingComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  selectedSize!: string;
  reviews = [1, 2, 1];
  relatedProducts: any;
  product$!: Observable<ProductInterface | undefined>;
  quantity: number | undefined;
  isLoading$!: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface | null | undefined>;
  stringId: string | null;
  id!: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.stringId = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = +this.stringId!;
  }

  ngOnInit() {
    this.relatedProducts = LehengaCholi;
    const id = parseInt(this.stringId!, 10);
    console.log(id);

    // Dispatch the action to fetch the product by ID
    this.store.dispatch(
      productActions.findProductsByIdRequest({ reqData: id }),
    );

    // Select the product from the store
    this.product$ = this.store.select(selectProduct);
    console.log(this.product$.subscribe());
    this.isLoading$ = this.store.select(selectIsLoading);
    // this.productServices.findProductsById(id);

    //   this.product$ = this.store.pipe(
    //     select(selectAdminProducts),
    //     map((productList) =>
    //       productList?.find((product) => product.productId === id),
    //     ),
    //   );
  }

  handleAddToCart() {
    this.product$.subscribe((product) => {
      if (product) {
        console.log('selected Size ', this.selectedSize);
        const req: AddItemRequestInterface = {
          size: this.selectedSize,
          productId: product.productId,
          quantity: this.quantity!,
        };
        this.store.dispatch(cartActions.addCartItemRequest({ reqData: req }));
        this.router.navigate(['cart']);
      }
    });
  }
}
