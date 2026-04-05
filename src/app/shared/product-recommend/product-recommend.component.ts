import { DecimalPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-recommend',
  templateUrl: './product-recommend.component.html',
  styleUrls: ['./product-recommend.component.scss'],
  imports: [ DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductRecommendComponent  implements OnInit {

  @Input() products: Product[] = [];
  constructor() { }

  ngOnInit() {}

}
