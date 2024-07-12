import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dresses } from '../../../assets/Data/HomePageJSONs/dresses';
import { Gowns } from '../../../assets/Data/HomePageJSONs/gowns';
import { mens_kurta } from '../../../assets/Data/HomePageJSONs/mens_kurta';
import { Pants } from '../../../assets/Data/HomePageJSONs/pants';
import { Shoes } from '../../../assets/Data/HomePageJSONs/shoes';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';

import { Store } from '@ngrx/store';
import { ProductStateInterface } from '../../models/State/productState.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainCarouselComponent, ProductSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  Pants: any;
  Gowns: any;
  Dresses: any;
  Kurta: any;
  Shoes: any;

  constructor(
    private router: Router,
    private store: Store<ProductStateInterface>,
  ) {}
  ngOnInit(): void {
    this.Pants = Pants.slice(0, 5);
    this.Gowns = Gowns.slice(0, 5);
    this.Dresses = Dresses.slice(0, 5);
    this.Kurta = mens_kurta.slice(0, 5);
    this.Shoes = Shoes.slice(0, 5);
  }
  navigateTo() {}
}
