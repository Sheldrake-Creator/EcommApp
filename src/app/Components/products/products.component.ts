import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { mensPants } from '../../../assets/Data/pants/men_page1';

import { ProductServices } from '../../Store/Product/product.service';
import { FindProductsByCategoryRequest } from '../../models/Requests/findProductsByCategoryRequest.interface';
import { ProductStateInterface } from '../../models/State/productState.interface';
import { filters, singleFilter } from './FilterData';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIcon,
    CommonModule,
    MatCheckboxModule,
    MatRadioModule,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  filterData: any;
  singleFilter: any;
  products: any;
  manPants: any;
  levelThree: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductServices,
    private store: Store<ProductStateInterface>,
    private route: Router,
  ) {}

  ngOnInit() {
    this.filterData = filters;
    this.singleFilter = singleFilter;
    this.manPants = mensPants;

    this.activatedRoute.paramMap.subscribe((params) => {
      console.log('params ', params);
      this.levelThree = params.get('levelThree');
      const reqData: FindProductsByCategoryRequest = {
        category: params.get('levelThree'),
        colors: '',
        sizes: '',
        minPrice: 0,
        maxPrice: 10000,
        sort: false,
        minDiscount: 0,
        pageNumber: 1,
        pageSize: 10,
        stock: 0,
      };
      this.productService.findProductsByCategory(reqData);
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const color = params['color'];
      const size = params['size'];
      const price = params['price'];
      const discount = params['discount'];
      const stock = params['stock'];
      const sort = params['sort'];
      const pageNumber = params['pageNumber'];
      const minPrice = price?.split('-')[0];
      const maxPrice = price?.split('-')[1];

      const reqData: FindProductsByCategoryRequest = {
        category: this.levelThree,
        colors: color ? [color].join(',') : '',
        sizes: size,
        minPrice: minPrice ? minPrice : 0,
        maxPrice: maxPrice ? maxPrice : 1000000,
        minDiscount: discount ? discount : 0,
        pageNumber: pageNumber ? pageNumber : 0,
        pageSize: 10,
        stock: stock,
        sort: sort ? sort : 'price',
      };

      this.productService.findProductsByCategory(reqData);
    });

    this.store.subscribe((product) => {
      this.products = product.product;
      console.log('store data ', product.product);
    });
  }
  handleMultipleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    console.log('queryParams ', queryParams);

    const filterValues = queryParams[sectionId]
      ? queryParams[sectionId].split(',')
      : [];

    const valueIndex = filterValues.indexOf(value);

    if (valueIndex != -1) {
      filterValues.splice(valueIndex, 1, '');
    } else {
      filterValues.push(value);
    }

    if (filterValues.length > 0) {
      queryParams[sectionId] = filterValues.join(',');
    } else {
      delete queryParams[sectionId];
    }
    this.router.navigate([], { queryParams });
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    queryParams[sectionId] = value;
    this.router.navigate([], { queryParams });
  }
}
