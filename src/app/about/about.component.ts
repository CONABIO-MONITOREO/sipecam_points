import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  bgColor = '#FFF';
  dark = false;

  onIntroStarted = () => {
    this.dark = true;
    this.bgColor = '#000';
  };

  onIntroEnded = () => {
    this.dark = false;
    this.bgColor = '#FFF';
  };
}
