import { Component, OnInit } from '@angular/core';
import { homeCarouselData } from '../../../../assets/Data/mainCarousel';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.scss'
})
export class MainCarouselComponent implements OnInit {
  carouselData: any;
  currentSlide = 0;
  interval:any;

  

  ngOnInit(): void {
    this.carouselData=homeCarouselData;
    // this.autoPlay();
    // console.log(this.carouselData);
    // console.log(this.nextSlide);
    // console.log(this.carouselData);
 
  }
  nextSlide(): void{
    console.log("current slide # ",this.currentSlide);
    console.log("total length ",this.carouselData.length);
    
    this.currentSlide=(this.currentSlide + 1) % this.carouselData.length;
  }
  prevSlide(): void{
    console.log("current slide # ",this.currentSlide);
    console.log("total length ",this.carouselData.length);
    if(this.currentSlide < 0){
      this.currentSlide =this.carouselData.length;
    }else{
      this.currentSlide-1;
    }
    
    this.currentSlide=(this.currentSlide - 1) % this.carouselData.length;
  }

 async autoPlay(){
    setInterval(()=>{
      this.nextSlide();
    },2000)
  }
}


