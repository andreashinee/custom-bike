import { Component, Input } from '@angular/core';

import { PriceDetail } from '@models/interfaces';


@Component({
  selector: 'app-price-summary',
  standalone: true,
  imports: [],
  templateUrl: './price-summary.html',
  styleUrl: './price-summary.scss'
})
export class PriceSummaryComponent {
  
  @Input() priceDetails: PriceDetail[] = [];

  
  @Input() totalPrice: number = 0;

  
  @Input() referenceCode: string = '';

  expanded: boolean = false;

  
  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
