import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { environment } from '@env/environment';
import '@fontsource/carlito';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],

  animations: [trigger('logoOut', [transition(':leave', [animate('200ms', style({ opacity: 0 }))])])],
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

  // ------- -------
  // Intro
  // ------- -------
  timeout = 500;
  timeout1s = 1000;
  introStarted = false;
  introState = 0;
  bgColor = '#FFF';
  bgIsDark = true;

  startIntro = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.introState = 1;
        this.bgColor = '#000';
        this.bgIsDark = true;
        resolve(true);
      }, this.timeout1s);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        this.introState = 1.1;
        this.state2();
      }, this.timeout1s * 2);
    });
  };

  state2 = async () => {
    setTimeout(() => {
      this.introState = 2;
      this.state3();
    }, this.timeout1s);
  };

  state3 = async () => {
    setTimeout(() => {
      this.introState = 3;
      this.state4();
    }, this.timeout);
  };

  state4 = async () => {
    setTimeout(() => {
      this.introState = 4;
      this.state5();
    }, this.timeout);
  };

  state5 = async () => {
    setTimeout(() => {
      this.introState = 5;
      this.state6();
    }, this.timeout);
  };

  state6 = async () => {
    setTimeout(() => {
      this.introState = 6;
      this.state7();
    }, this.timeout);
  };

  state7 = async () => {
    setTimeout(() => {
      this.introState = 7;
      this.state8();
    }, this.timeout);
  };

  state8 = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.introState = 8;
        resolve(true);
      }, this.timeout);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        this.introState = 8.1;
        this.bgColor = '#FFF';
        this.bgIsDark = false;
        this.state9();
        resolve(true);
      }, this.timeout1s);
    });
  };

  state9 = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, this.timeout1s);
    });

    for (let i = 1; i <= 7; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          this.introState = 101 + i;
          resolve(true);
        }, this.timeout / 2);
      });
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, this.timeout1s);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        this.introState = 100;
        resolve(true);
      }, this.timeout1s);
    });
  };
  // ------- -------

  isHidden = true;
  hoverItemId = '';
  hoverLineId = 0;

  onMouseEnter(itemId: string) {
    this.hoverItemId = itemId;
  }

  onMouseLeave() {
    this.hoverItemId = '';
  }

  onLineEnter(itemId: number) {
    this.hoverLineId = itemId;
  }

  onLineLeave() {
    this.hoverLineId = 0;
  }

  ngOnInit() {
    this.startIntro();
    // this.state9()
  }
}
