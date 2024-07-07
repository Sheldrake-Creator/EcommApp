import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarContent } from './nav-content';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.scss',
})
export class NavContentComponent implements OnInit {
  categories: any;

  @Input() selectedCategory: any;

  ngOnInit(): void {
    this.categories = NavBarContent;
    console.log('selected Sections', this.selectedCategory);
  }

  constructor(private router: Router) {}
  handleNavigate = (path: any) => {
    this.router.navigate([path]);
  };
}
