import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Confusing } from '../../../assets/Data/HomePageJSONs/confusing';
import { ill_concieved } from '../../../assets/Data/HomePageJSONs/ill_concieved';
import { Injurious } from '../../../assets/Data/HomePageJSONs/injurious';
import { MildlyUpsetting } from '../../../assets/Data/HomePageJSONs/mildly_upsetting';
import { Silly } from '../../../assets/Data/HomePageJSONs/silly';
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
  Injurious: any;
  Silly: any;
  Confusing: any;
  IllConcieved: any;
  MildlyUpsetting: any;

  constructor(
    private router: Router,
    private store: Store<ProductStateInterface>,
  ) {}
  ngOnInit(): void {
    this.Injurious = Injurious.slice(0, 5);
    this.Silly = Silly.slice(0, 5);
    this.Confusing = Confusing.slice(0, 5);
    this.IllConcieved = ill_concieved.slice(0, 5);
    this.MildlyUpsetting = MildlyUpsetting.slice(0, 5);
  }
  navigateTo() {}
}
