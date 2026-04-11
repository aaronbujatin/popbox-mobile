import { DecimalPipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonRouterLink } from '@ionic/angular/standalone';
import { Product } from 'src/app/model/product';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-product-recommend',
  standalone: true,
  templateUrl: './product-recommend.component.html',
  styleUrls: ['./product-recommend.component.scss'],
  imports: [DecimalPipe, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductRecommendComponent implements OnInit {
  @Input() products: Product[] = [];
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToProduct(id: number) {
    this.navCtrl.navigateForward(`/products/${id}`);
  }
}
