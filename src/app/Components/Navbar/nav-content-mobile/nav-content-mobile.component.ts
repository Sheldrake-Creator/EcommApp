import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductStateInterface } from '../../../models/State/productState.interface';
import {
  NavBarContentMobileDangerous,
  NavBarContentMobilePointless,
} from '../nav-content/nav-content';

@Component({
  selector: 'app-nav-content-mobile',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, CommonModule],
  templateUrl: './nav-content-mobile.component.html',
  styleUrl: './nav-content-mobile.component.scss',
})
export class NavContentMobileComponent implements OnInit {
  [x: string]: any;
  navCategory: any;
  @ViewChild('categoriesMenu') categoriesMenu!: MatMenu;
  @ViewChild('brandsMenu') brandsMenu!: MatMenu;
  @ViewChild('veracityMenu') veracityMenu!: MatMenu;
  menuMap = new Map<string, MatMenuPanel>();

  pMenu = NavBarContentMobilePointless;
  categories: any;
  brands: any;
  veracity: any;

  dMenu = NavBarContentMobileDangerous;

  ngAfterViewInit() {}
  constructor(
    private router: Router,
    private store: Store<ProductStateInterface>,
  ) {}
  ngOnInit(): void {
    this.menuMap.set('categories', this.categoriesMenu);
    this.menuMap.set('brands', this.brandsMenu);
    this.menuMap.set('veracity', this.veracityMenu);
  }

  handleNavigate = (path: any) => {
    this.router.navigate([path]);
  };
  handleMobileNavigate(section: string, value: string) {
    const url = `/products/${section}/${value}`;
    this.router.navigateByUrl(url);
  }
}
