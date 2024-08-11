import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { productActions } from '../../../Store/Product/product.action';
import {
  NavBarContentInterface,
  SectionInterface,
} from '../../../models/NavContent/navContent.interface';
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
  [x: string]: any;
  navContent: any;

  @Input() selectedSection: any;
  @Input() subCategoryList: any;

  ngOnInit(): void {
    this.navContent = NavBarContent;

    console.log('NavBar: ', this.navContent);
    console.log('Selected Section:', this.selectedSection);

    console.log(
      'Categories:',
      this.navContent[this.selectedSection].categories,
    );
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
      // colors: 'red,blue',
      // minPrice: 100,
    };
    const reqData = createFindProductsByCategoryRequest(customRequest);
    this.store.dispatch(
      productActions.findProductByCategoryRequest({ reqData }),
    );
  }
}
