import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import '@fontsource/carlito';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 5000,
    },
  };

  constructor() {}

  ngOnInit() {}
}
