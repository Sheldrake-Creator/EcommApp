import { Component, OnInit } from '@angular/core';
import { Shoes } from '../../../assets/Data/Accessory JSONs/shoes';

import { Gowns } from '../../../assets/Data/HomePageJSONs/gowns';
import { Kurta } from '../../../assets/Data/HomePageJSONs/kurta';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';

import { Dresses } from '../../../assets/Data/Clothing JSONs/dresses';
import { Pants } from '../../../assets/Data/Clothing JSONs/pants';

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

  ngOnInit(): void {
    this.Pants = Pants.slice(0, 5);
    this.Gowns = Gowns.slice(0, 5);
    this.Dresses = Dresses.slice(0, 5);
    this.Kurta = Kurta.slice(0, 5);
    this.Shoes = Shoes.slice(0, 5);
  }
}
