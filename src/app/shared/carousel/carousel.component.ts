import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent  implements OnInit {

  ngOnInit() {}

  @Input() images: string[] = [];

}
