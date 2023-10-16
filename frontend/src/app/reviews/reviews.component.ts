import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  spotsReview: Spot = [
    { name: "Horn Center", rating: "2", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "VEC Squad", rating: "3", imageUrl: "assets/spots/Spot1.jpeg"}
  ]

  constructor() {}

  ngOnInit() {}

  selectedTabIndex: number = 0; // Initial selected tab index
  tabs: number = this.spotsReview.length; // Replace with your tab data

  // Function to handle tab changes
  tabChanged(event: number): void {
    this.selectedTabIndex = event;
  }

  // Function to select the previous tab
  selectPreviousTab(): void {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }

  // Function to select the next tab
  selectNextTab(): void {
    if (this.selectedTabIndex < this.tabs - 1) {
      this.selectedTabIndex++;
    }
  }
}

type Spot = Array<{ name: string; rating: string; imageUrl: string; }>;