import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  @Input() name: string;
  @Input() index: number;
  @Input() foods: any[];
  @Input() totals: any[];
  @Input() diary: string;
  constructor() { }

  ngOnInit() {
  }

}
