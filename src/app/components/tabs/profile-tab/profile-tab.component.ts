import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  barcodeOutline,
  carOutline,
  chevronBackOutline,
  chevronForward,
  chevronForwardOutline,
  constructOutline,
  constructSharp,
  cubeOutline,
  giftOutline,
  heartOutline,
  locationOutline,
  mailOutline,
  person,
  personAddOutline,
  scanOutline,
  storefrontOutline,
  walletOutline,
} from 'ionicons/icons';
@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileTabComponent implements OnInit {
  ngOnInit() {}

  orderItems = [
    { key: 'pay', icon: 'wallet-outline', label: 'To Pay' },
    { key: 'storage', icon: 'cube-outline', label: 'In Storage\n(Box House)' },
    { key: 'process', icon: 'construct-outline', label: 'Processing' },
    { key: 'shipped', icon: 'car-outline', label: 'Shipped' },
  ];

  assets = [
    { key: 'coupons', value: 0, label: 'COUPONS' },
    { key: 'lucky', value: 0, label: 'LUCKY POINTS' },
    { key: 'tips', value: 0, label: 'TIPS CARD' },
    { key: 'earlypass', value: 0, label: 'EARLYPASS CARD' },
  ];

  quickLinks = [
    { key: 'rewards', icon: 'gift-outline', label: 'Earned Rewards' },
    { key: 'wishlist', icon: 'heart-outline', label: 'Wishlist' },
    { key: 'address', icon: 'location-outline', label: 'Shipping Address' },
    { key: 'store', icon: 'storefront-outline', label: 'Find a Store' },
    { key: 'follow', icon: 'person-add-outline', label: 'Follow Us' },
    { key: 'notif', icon: 'mail-outline', label: 'Notification' },
    { key: 'scan', icon: 'scan-outline', label: 'Scanning' },
  ];

  constructor(private router: Router) {
    addIcons({
      walletOutline,
      cubeOutline,
      constructOutline,
      carOutline,
      giftOutline,
      heartOutline,
      locationOutline,
      storefrontOutline,
      personAddOutline,
      mailOutline,
      scanOutline,
      chevronForwardOutline,
      barcodeOutline
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
  openMemberCard() {
    this.router.navigate(['/member-card']);
  }
  goToPoints() {
    this.router.navigate(['/points']);
  }
  goToRewards() {
    this.router.navigate(['/rewards']);
  }
  goToOrder(key: string) {
    this.router.navigate(['/orders', key]);
  }
  goToAsset(key: string) {
    this.router.navigate(['/assets', key]);
  }
  goToLink(key: string) {
    this.router.navigate(['/links', key]);
  }
}
