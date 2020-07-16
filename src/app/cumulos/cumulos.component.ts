import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../home/services/dashboard.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AddCumuloComponent } from './add-cumulo/add-cumulo.component';

import { environment } from '@env/environment';

@Component({
  selector: 'app-cumulos',
  templateUrl: './cumulos.component.html',
  styleUrls: ['./cumulos.component.scss'],
})
export class CumulosComponent implements OnInit {
  nodes: any = [];

  constructor(
    private alertController: AlertController,
    private dashboardService: DashboardService,
    private modalController: ModalController
  ) {}

  async deleteCumulo(id: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar cúmulo',
      message: `¿Deseas elimininar el cúmulo ${id}`,
      buttons: [
        'Cancelar',
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Cúmulo eliminado');
          },
        },
      ],
    });

    await alert.present();
  }

  async addCumulo(cumulo?: any) {
    console.log('EDIT');
    const modal = await this.modalController.create({
      component: AddCumuloComponent,
      componentProps: {
        cumulo,
      },
      // cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async getNodes() {
    try {
      this.nodes = await this.dashboardService.allCumulusesGraphql();
    } catch (error) {
      console.log(error);
    }
  }
  ngOnInit() {
    this.getNodes();
  }
}
