import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-about-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  animations: [
    trigger('logoOut', [transition(':leave', [animate('200ms', style({ opacity: 0 }))])]),
    trigger('lineIn', [transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))])]),
  ],
})
export class IntroComponent implements OnInit {
  @Output() introStarted = new EventEmitter();
  @Output() introEnded = new EventEmitter();

  ngOnInit() {
    this.startIntro();
  }

  // ------- -------
  // images
  // ------- -------
  imagesLoading = true;
  imagesError = false;
  images = [
    'assets/logo-blanco.png',
    'assets/logo.png',
    'assets/bg/Fauna_Flora_SiPeCaM-02.png',
    'assets/bg/Fauna_Flora_SiPeCaM-03.png',
    'assets/bg/Fauna_Flora_SiPeCaM-04.png',
    'assets/bg/Fauna_Flora_SiPeCaM-05.png',
    'assets/bg/Fauna_Flora_SiPeCaM-06.png',
    'assets/bg/Fauna_Flora_SiPeCaM-07.png',
    'assets/bg/Fauna_Flora_SiPeCaM-08.png',
  ];

  loadImages = async () => {
    this.imagesLoading = true;

    // --
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, this.timeout1s);
    });

    // --
    for (let i = 0; i < this.images.length && !this.imagesError; i++) {
      // load
      await new Promise((resolve) => {
        let img = new Image();
        img.onload = () => {
          resolve(true);
        };
        img.src = this.images[i];
      }).catch(() => {
        // error
        this.imagesError = true;
      });
    }
    // --
    this.imagesLoading = false;
  };

  // ------- -------
  // Intro
  // ------- -------
  timeout = 500;
  timeout1s = 1000;
  introState = 0;
  bgColor = '#FFF';

  startIntro = async () => {
    await this.loadImages();
    if (this.imagesError) {
      this.introState = 100;
      return;
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        this.introState = 1;
        this.bgColor = '#000';
        this.introStarted.emit();
        resolve(true);
      }, 0);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        this.introState = 1.1;
        this.state2();
        resolve(true);
      }, this.timeout1s);
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
        this.state9();
        resolve(true);
      }, this.timeout);
    });
  };

  state9 = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.introState = 9;
        resolve(true);
      }, this.timeout);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        this.bgColor = '#FFF';
        this.introEnded.emit();
        this.state100();
        resolve(true);
      }, this.timeout1s);
    });
  };

  state100 = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.introState = 100;
        resolve(true);
      }, this.timeout1s);
    });
  };

  // ------- -------
  hoverItemId = '';
  hoverLineId = 0;

  onLineEnter(itemId: number) {
    this.hoverLineId = itemId;
  }

  onLineLeave() {
    this.hoverLineId = 0;
  }
}
