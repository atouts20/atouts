import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { Produit } from '../../../model/model.produit';

@Component({
  selector: 'app-cart-calculator',
  templateUrl: './cart-calculator.component.html',
  styleUrls: ['./cart-calculator.component.css']
})
export class CartCalculatorComponent implements OnInit, OnChanges {
  @Input() produits: Produit[];

	totalValue = 0;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
		const dataChanges: SimpleChange = changes.products;

		const products: Produit[] = dataChanges.currentValue;
		this.totalValue = 0;
		products.forEach((produits) => {
			this.totalValue += produits.prix;
		});
	}
}
