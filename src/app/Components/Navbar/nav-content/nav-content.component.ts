import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { navigation } from './nav-content';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.scss'
})
export class NavContentComponent implements OnInit{
  category:any;

  @Input() selectedSection:any;

  ngOnInit(): void {
    this.category=navigation;
    console.log("selected Sections",this.selectedSection);
  }

  constructor(private router: Router){

  }
  handleNavigate=(path:any)=>{
    this.router.navigate([path])
  }
}
