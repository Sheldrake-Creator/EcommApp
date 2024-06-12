import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { mensPants } from '../../../assets/Data/pants/men_page1'
import { gounsPage1 } from '../../../assets/Data/Gouns/gouns';
import { dressPage1 } from '../../../assets/Data//dress/dressPage';
import { kurtaPage1 } from '../../../assets/Data/Kurta/kurta';
import { mensShoesPage1 } from '../../../assets/Data/shoes';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainCarouselComponent, ProductSliderComponent],
templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  mensPants:any
  Gowns: any
  Dresses: any
  Kurta: any
  Shoes: any


  ngOnInit(): void {
    this.mensPants=mensPants.slice(0,5);
    this.Gowns=gounsPage1.slice(0,5);
    this.Dresses=dressPage1.slice(0,5);
    this.Kurta=kurtaPage1.slice(0,5);
    this.Shoes = mensShoesPage1.slice(0,5);

  }

}
