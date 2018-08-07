import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  @Input() name: string;
  @Input() foods: any[];
  @Input() totals: any[];
  constructor() { }

  ngOnInit() {
  }

}
