import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
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
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  finalize,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { productActions } from '../../Store/Product/product.action';
import { selectProducts } from '../../Store/Product/product.reducer';
import { ProductServices } from '../../Store/Product/product.service';
import { ProductInterface } from '../../models/Product/product.interface';
import { QueryParams } from '../../models/Requests/QueryParams.interface';
import { FindProductsByCategoryPageRequest } from '../../models/Requests/findProductsByCategoryPageRequest.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
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
export class ProductsComponent implements OnInit, OnDestroy {
  isFilterOpen = false;
  filterData: any;
  singleFilter: any;
  levelThree: any;
  singleCategory?: any;
  isLoading$!: Observable<boolean>;
  page = 0;
  allProducts$?: Observable<ProductInterface[] | undefined>;
  navContentProducts$?: Observable<ProductInterface[] | undefined>;
  SingleSearchArray?: string[];
  @ViewChild('scrollContainer') scrollContainer?: ElementRef;
  someProducts$?: Observable<ProductInterface[] | undefined>;
  selectedOptions: { [key: string]: any[] } = {};
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<ProductStateInterface>,
    private productService: ProductServices,
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    // Using snapshot to capture the itemId parameter once when the component is initialized
    this.singleFilter = singleFilter;
    this.filterData = filters;

    const showAll = this.activatedRoute.snapshot.queryParams['showAll'];
    const params = this.activatedRoute.snapshot.params;

    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('Current itemId Params:', params);

      //  Debugging Helper param changes
      //   if (params['category']) {
      //     console.log('Category:', params['category']);
      //   }
      //   if (params['brands']) {
      //     console.log('Brand:', params['brand']);
      //   }
      //   if (params['veracity']) {
      //     console.log('Veracity:', params['veracity']);
      //   }
    });
    //Show All Products if NavbarButton is pressed
    if (showAll) {
      console.log('showAll:', showAll);
      this.store.dispatch(productActions.getAllProductsRequest());
      this.allProducts$ = this.store.select(selectProducts);

      //If the User is searching using the navContent
    } else if (params) {
      this.navContentProducts$ = this.activatedRoute.params.pipe(
        switchMap((params) => {
          const case1 = params['levelOne'] || '';
          const case2 = params['levelTwo'] || '';
          const case3 = params['levelThree'] || '';
          console.log('case1 ', case1);
          console.log('case2 ', case2);
          console.log('case3 ', case3);
          ['levelThree'] || '';
          return this.productService
            .singleCategorySearch(case1, case2, case3)
            .pipe(
              map(
                (response: HttpResponseInterface) =>
                  response.data['products'] as ProductInterface[],
              ),
            );
        }),
      );
    }
  }

  collectRouteParams(router: Router) {
    let queryParams = {};
    let stack: ActivatedRouteSnapshot[] = [
      this.router.routerState.snapshot.root,
    ];

    while (stack.length > 0) {
      const route = stack.pop()!;
      console.log('Current route: ', route);
      console.log('Route params: ', route.queryParams);

      queryParams = { ...queryParams, ...route.queryParams };
      console.log('Accumulated params: ', queryParams);

      stack.push(...route.children);
      console.log('Updated stack: ', stack);
    }
    return queryParams;
  }

  //Filter Button Search
  filterProducts() {
    this.allProducts$ = null;
    this.navContentProducts$ = null;

    const qParams: QueryParams = this.collectRouteParams(this.router);
    console.log('qParams: ', qParams);

    this.loading$.next(false);
    this.someProducts$ = this.productService
      .findProductsByCategory(qParams)
      .pipe(
        map(
          (httpResponse: HttpResponseInterface) =>
            httpResponse.data['products'] as ProductInterface[],
        ),
        finalize(() => this.loading$.next(false)),
      );
    this.someProducts$.forEach((product) => console.log(product));
  }

  //Checkbox Buttons
  handleMultipleSelectFilter(value: string, itemId: string) {
    if (!this.selectedOptions[itemId]) {
      this.selectedOptions[itemId] = [];
    }
    const index = this.selectedOptions[itemId].indexOf(value);

    if (index === -1) {
      // If the value is not in the array, add it
      this.selectedOptions[itemId].push(value);
    } else {
      // If the value is in the array, remove it
      this.selectedOptions[itemId].splice(index, 1);
    }

    this.updateitemIdParams();
  }

  //Radio Buttons
  handleSingleSelectFilter(value: any, itemId: string) {
    this.selectedOptions[itemId] = [value];

    // Update the query params in the URL
    this.updateitemIdParams();
  }

  //Updates current URI
  updateitemIdParams() {
    const queryParams: { [key: string]: string | null } = {};
    // Remove showAll from queryParams
    queryParams['showAll'] = null;

    Object.keys(this.selectedOptions).forEach((itemId) => {
      if (this.selectedOptions[itemId].length > 0) {
        queryParams[itemId] = this.selectedOptions[itemId].join(',');
      } else {
        queryParams[itemId] = null;
      }
    });

    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge', // Merge with existing itemId params
    });
  }

  //UnderConstruction
  toggleMobileFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  getLoading(): Observable<boolean> {
    return this.loading$;
  }
}

// @HostListener('window:scroll', [])
// onScroll(): void {
//   const container =
//     this.scrollContainer?.nativeElement || document.documentElement;
//   const scrollTop = window.scrollY || container.scrollTop;
//   const scrollHeight = container.scrollHeight;
//   const offsetHeight = container.clientHeight;
//   console.log('scrolling!');

//   if (scrollTop + offsetHeight >= scrollHeight - 1) {
//     console.log('scrolled to the bottom');
//     // this.loadProducts();
//   }
// }

//   if (this.currentPage < this.totalPages && !this.loading) {
//     this.loading = true;
//     console.log('Loading products for page:', this.currentPage);
//     this.productService.getAllProductsPaginated(this.currentPage).subscribe(
//       (response: HttpResponsePaginatedInterface) => {
//         console.log('API response:', response);
//         const currentProductsPage = response.data.pages;

//         // Concatenate the content of the new page to the existing allProducts array
//         this.allProducts = [
//           ...this.allProducts,
//           ...currentProductsPage.content,
//         ];

//         // Push new page data to the pages$
//         const currentPages = this.pages$.getValue();
//         this.pages$.next([...currentPages, currentProductsPage]);

//         // Update page details
//         this.totalPages = currentProductsPage.totalPages;
//         this.currentPage++;

//         // Reset the loading flag
//         this.loading = false;
//       },
//       (error) => {
//         console.error('API call failed:', error);
//         this.loading = false;
//       },
//     );
//   }
// }

// Load Products Handler

// loadProducts(): void {
//   if (this.currentPage < this.totalPages && !this.loading) {
//     this.loading = true;
//     console.log('Loading products for page:', this.currentPage);

//     this.productService.getAllProductsPaginated(this.currentPage).subscribe({
//       next: (response: HttpResponsePaginatedInterface) => {
//         console.log('API response:', response);
//         const currentProductsPage = response.data.pages;
//         // Handle the current page data
//         // this.products.push(...currentProductsPage); // Example handling

//         this.someProducts = [
//           ...this.someProducts,
//           ...currentProductsPage.content,
//         ];

//         this.totalPages = currentProductsPage.totalPages;
//         this.currentPage++;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error loading products:', err);
//         this.loading = false;
//       },
//       complete: () => {
//         console.log('Finished loading products.');
//       },
//     });
//   }
// }

// this.store.subscribe((product) => {
//   this.products = product.product;
//   console.log('store data ', product.product);
// });

//Filter Products Paginated Results

// this.activatedRoute.queryParams.subscribe((params) => {
//   const categories = params['category'];
//   console.log('categories:', categories);
//   const brands = params['brand'];
//   console.log('brands:', brands);
//   const price = params['price'];
//   const discount = params['discount'];
//   const veracity = params['veracity'];
//   const pageNumber = params['pageNumber'];
//   const minPrice = price ? price.split('-')[0] : '0';
//   const maxPrice = price ? price.split('-')[1] : '10000';
//   const sort = params['sort'];

//   // Create the request data object, ensuring 'categories' and 'brands' are arrays
//   const reqData: FindProductsByCategoryRequest = {
//     categories: categories.length > 0 ? categories : [],
//     brands: brands.length > 0 ? brands : [],
//     minPrice: minPrice,
//     maxPrice: maxPrice,
//     minDiscount: discount ? discount : 0,
//     pageNumber: pageNumber ? pageNumber : 0,
//     pageSize: 10,
//     veracity: veracity,
//     sort: sort ? sort : 'sort',
//   };

//   this.someProducts$ = this.productService
//     .findProductsByCategory(reqData)
//     .pipe(
//       map(
//         (httpResponse: HttpResponseInterface) =>
//           httpResponse.data['products'].con,
//       ),
//     );
// });
