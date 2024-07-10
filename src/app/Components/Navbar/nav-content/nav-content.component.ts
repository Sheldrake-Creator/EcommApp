import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { productActions } from '../../../Store/Product/product.action';
import {
  FindProductsByCategoryRequest,
  createFindProductsByCategoryRequest,
} from '../../../models/Requests/findProductsByCategoryRequest.interface';
import { ProductStateInterface } from '../../../models/State/productState.interface';
import { NavBarContent } from './nav-content';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.scss',
})
export class NavContentComponent implements OnInit {
  categories: any;

  @Input() selectedCategory!: any;
  @Input() subCategoryList!: any;

  ngOnInit(): void {
    this.categories = NavBarContent;
    console.log('selected Sections', this.selectedCategory);
  }

  constructor(
    private router: Router,
    private store: Store<ProductStateInterface>,
  ) {}
  handleNavigate = (path: any) => {
    this.router.navigate([path]);
  };

  getByCategoryHandler() {
    const customRequest: Partial<FindProductsByCategoryRequest> = {
      colors: 'red,blue',
      minPrice: 100,
    };
    const reqData = createFindProductsByCategoryRequest(customRequest);
    this.store.dispatch(
      productActions.findProductByCategoryRequest({ reqData }),
    );
  }
}
