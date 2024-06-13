import { Component } from '@angular/core';
// import { StarRatingComponent } from '../../../../Shared/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-review-card.component.html',
  styleUrl: './product-review-card.component.scss',
})
export class ProductReviewCardComponent {
  reviews = [1, 2, 23, 1, 1];
}
