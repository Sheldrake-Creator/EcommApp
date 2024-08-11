import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductServices } from '../../Store/Product/product.service';
import { ProductInterface } from '../../models/Product/product.interface';
import { HttpResponsePaginatedInterface } from '../../models/Responses/httpResponsePaginated.interface';
import { ProductPageInterface } from '../../models/Responses/page.interface';
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
    MatProgressSpinnerModule,
    CdkAccordionModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  filterData: any;
  singleFilter: any;
  levelThree: any;
  isLoading$!: Observable<boolean>;
  page = 0;

  @ViewChild('scrollContainer') scrollContainer?: ElementRef;
  allProducts: ProductInterface[] = [];
  pages$: BehaviorSubject<ProductPageInterface[]> = new BehaviorSubject<
    ProductPageInterface[]
  >([]);

  currentPage = 0;
  totalPages = 0;
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<ProductStateInterface>,
    private productService: ProductServices,
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.filterData = filters;
    this.singleFilter = singleFilter;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const container =
      this.scrollContainer?.nativeElement || document.documentElement;
    const scrollTop = window.pageYOffset || container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const offsetHeight = container.clientHeight;

    if (scrollTop + offsetHeight >= scrollHeight - 1) {
      this.loadProducts();
    }
  }

  loadProducts(): void {
    if (this.currentPage < this.totalPages && !this.loading) {
      this.loading = true;
      console.log('Loading products for page:', this.currentPage);
      this.productService.getAllProductsPaginated(this.currentPage).subscribe(
        (response: HttpResponsePaginatedInterface) => {
          console.log('API response:', response);
          const currentProductsPage = response.data.pages;

          // Concatenate the content of the new page to the existing allProducts array
          this.allProducts = [
            ...this.allProducts,
            ...currentProductsPage.content,
          ];

          // Push new page data to the pages$
          const currentPages = this.pages$.getValue();
          this.pages$.next([...currentPages, currentProductsPage]);

          // Update page details
          this.totalPages = currentProductsPage.totalPages;
          this.currentPage++;

          // Reset the loading flag
          this.loading = false;
        },
        (error) => {
          console.error('API call failed:', error);
          this.loading = false;
        },
      );
    }
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
export interface ProductsPaginator {
  items: ProductInterface[];
  page: number;
  hasMorePages: boolean;
}

// this.activatedRoute.paramMap.subscribe((params) => {
//   console.log('params ', params);
//   this.levelThree = params.get('levelThree');
//   const reqData: FindProductsByCategoryRequest = {
//     category: params.get('levelThree'),
//     colors: '',
//     sizes: '',
//     minPrice: 0,
//     maxPrice: 10000,
//     sort: false,
//     minDiscount: 0,
//     pageNumber: 1,
//     pageSize: 10,
//     stock: 0,
//   };
//   this.productService.findProductsByCategory(reqData);
// });

// this.activatedRoute.queryParams.subscribe((params) => {
//   const color = params['color'];
//   const size = params['size'];
//   const price = params['price'];
//   const discount = params['discount'];
//   const stock = params['stock'];
//   const sort = params['sort'];
//   const pageNumber = params['pageNumber'];
//   const minPrice = price?.split('-')[0];
//   const maxPrice = price?.split('-')[1];

//   const reqData: FindProductsByCategoryRequest = {
//     category: this.levelThree,
//     colors: color ? [color].join(',') : '',
//     sizes: size,
//     minPrice: minPrice ? minPrice : 0,
//     maxPrice: maxPrice ? maxPrice : 1000000,
//     minDiscount: discount ? discount : 0,
//     pageNumber: pageNumber ? pageNumber : 0,
//     pageSize: 10,
//     stock: stock,
//     sort: sort ? sort : 'price',
//   };

//   this.productService.findProductsByCategory(reqData);
// });

// this.store.subscribe((product) => {
//   this.products = product.product;
//   console.log('store data ', product.product);
// });

// this.activatedRoute.queryParams.subscribe((params) => {
//   const showAll = params['showAll'];
//   if (showAll) {
//     this.store.dispatch(productActions.getAllProductsRequest());
//     this.allProducts$ = this.store.select(selectProducts);
//     this.isLoading$ = this.store.select(selectIsLoading);
//     this.loadMoreProducts();
//   }
// });
