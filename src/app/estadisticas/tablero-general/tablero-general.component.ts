import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexOptions,
} from 'ng-apexcharts';

import { Apollo } from 'apollo-angular';
import {
  getDevices,
  getVisits,
  getDeployments,
  getIndividuals,
  getTransects,
  getAllFiles,
  getFiles,
  getCumulus,
} from '@api/tableros';
import { getEcosystems } from '@api/mapa';
import { AlertController } from '@ionic/angular';

export interface Visit {
  date_sipecam_second_season: string;
  date_first_season: string;
  date_second_season: string;
  cumulus_visit: {
    id: string;
    name: string;
  };
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-tablero-general',
  templateUrl: './tablero-general.component.html',
  styleUrls: ['./tablero-general.component.scss'],
})
export class TableroGeneralComponent implements OnInit, AfterViewInit {
  cumulo: any = null;
  cumuloId: string = null;

  cumulusByEcosystem = {};

  visits: any = null;
  ecosystems: any = [];
  currentEcosystem: any = 'todos';

  colors = ['#2D82B7', '#FF6978', '#E6C79C', '#56AAB8', '#cddfa0'];

  formulariosChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Cámaras Trampa',
        data: [],
      },
      {
        name: 'Grabadoras',
        data: [],
      },
      {
        name: 'Peq. Mamíferos',
        data: [],
      },
      {
        name: 'ERIE',
        data: [],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      labels: {
        rotate: -90,
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Formularios entregados',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' formularios';
        },
      },
    },
  };

  visitasChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Visitas',
        data: [],
      },
      {
        name: 'Reportes',
        data: [],
      },
    ],
    chart: {
      height: 350,
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    stroke: {
      width: 2,
      show: true,
    },
    xaxis: {
      categories: [],
      labels: {
        rotate: -90,
      },
    },
    yaxis: {
      title: {
        text: 'Registros',
      },
    },
    /*fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [100],
      },
    },*/
  };

  devicesStatusChart: ApexOptions = {
    series: [],
    chart: {
      height: 250,
      type: 'donut',
    },
    labels: [],
    legend: {
      position: 'left',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  devicesTypeChart: ApexOptions = {
    series: [],
    chart: {
      height: 250,
      type: 'donut',
    },
    labels: [],
    legend: {
      position: 'left',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  activeDevicesChart: ApexOptions = {
    series: [],
    chart: {
      height: 250,
      type: 'donut',
    },
    labels: [],
    legend: {
      position: 'left',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  filesChart: ApexOptions = {
    series: [
      {
        name: 'Audio',
        data: [],
      },
      {
        name: 'Video',
        data: [],
      },
      {
        name: 'Imágenes',
        data: [],
      },
    ],
    chart: {
      type: 'area',
      height: 350,
      stacked: false,
    },
    colors: this.colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Archivos entregados',
      },
    },
  };

  filesSizeChart: ApexOptions = {
    series: [
      {
        name: 'MB',
        data: [],
      },
    ],
    chart: {
      type: 'area',
      height: 350,
      stacked: false,
    },
    colors: this.colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Datos entregados (MB)',
      },
    },
  };

  constructor(private alertController: AlertController, private apollo: Apollo, private route: ActivatedRoute) {
    this.cumuloId = this.route.snapshot.paramMap.get('id') || null;
  }

  async ecosystemChanged() {
    await this.getVisits();
    await this.getFiles();
    await this.getFormularios();
    await this.getDevices();
  }

  async getCumulus() {
    try {
      const { data }: any = await this.apollo
        .query({
          query: getCumulus,
          variables: {
            pagination: {
              limit: 1000,
              offset: 0,
            },
          },
        })
        .toPromise();
      const cumulus = data?.cumulus ?? [];
      this.cumulusByEcosystem = _.groupBy(cumulus, (c) => c.ecosystem_id);
    } catch (error) {
      console.log(error);
    }
  }

  async getFiles() {
    let files: any = null;
    if (this.currentEcosystem !== 'todos') {
      try {
        const { data }: any = await this.apollo
          .query({
            query: getFiles,
            variables: {
              ecosystem_id: Number(this.currentEcosystem),
            },
          })
          .toPromise();

        files = data?.ecosystemFileCounts.file_count_ecosystem ?? [];
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data }: any = await this.apollo
          .query({
            query: getAllFiles,
            variables: {
              pagination: {
                limit: 1000,
                offset: 0,
              },
            },
          })
          .toPromise();

        files = data?.file_counts ?? [];
      } catch (error) {
        console.log(error);
      }
    }

    files = files.sort((a, b) => a.delivery_date.localeCompare(b.delivery_date));
    const categories = [];
    const audio = [];
    const video = [];
    const images = [];
    const size = [];
    files.forEach((delivery) => {
      categories.push(delivery.delivery_date);
      audio.push(delivery.audio_files ?? 0);
      video.push(delivery.video_files ?? 0);
      images.push(delivery.image_files ?? 0);
      size.push(delivery.size ?? 0);
    });

    this.filesChart.series = [
      {
        name: 'Audio',
        data: audio,
      },
      {
        name: 'Video',
        data: video,
      },
      {
        name: 'Imágenes',
        data: images,
      },
    ];
    this.filesChart.xaxis = {
      categories,
    };

    this.filesSizeChart.series = [
      {
        name: 'MB',
        data: size,
      },
    ];
    this.filesSizeChart.xaxis = {
      categories,
    };
  }

  async getVisits() {
    try {
      const {
        data: { visits },
      }: any = await this.apollo
        .query({
          query: getVisits,
          variables: {
            search: {
              field: 'date_first_season',
              value: null,
              operator: 'ne',
            },
            pagination: {
              limit: 1000,
              offset: 0,
            },
          },
        })
        .toPromise();
      let conSocio = visits.filter((v) => v.cumulus_visit.con_socio === 2);

      if (this.currentEcosystem !== 'todos') {
        conSocio = conSocio.filter((v) => v.cumulus_visit.ecosystem_id == this.currentEcosystem);
      }
      this.visits = _.groupBy(conSocio, (v) => v.cumulus_visit.name);

      const categories = [];
      const dataVisits = [];
      const dataReports = [];
      Object.keys(this.visits).forEach((cumulo) => {
        categories.push(`Cúm ${cumulo}`);
        const numVisits = this.visits[cumulo]
          .map((visit) => (visit.date_second_season ? 2 : 1))
          .reduce((previous, current) => previous + current, 0);
        dataVisits.push(numVisits);

        const numReports = this.visits[cumulo]
          .map((visit) => {
            let rep = 0;
            if (visit.report_first_season) {
              rep = rep + 1;
            }
            if (visit.report_second_season) {
              rep = rep + 1;
            }
            return rep;
          })
          .reduce((previous, current) => previous + current, 0);
        dataReports.push(numReports);
      });
      this.visitasChart.xaxis = {
        labels: {
          rotate: -90,
        },
        categories: categories,
      };
      this.visitasChart.series[0].data = dataVisits;
      this.visitasChart.series[1].data = dataReports;
    } catch (error) {
      console.log(error);
    }
  }

  async getDevices() {
    try {
      const {
        data: { physical_devices },
      }: any = await this.apollo
        .query({
          query: getDevices,
          variables: {
            pagination: {
              limit: 5000,
              offset: 0,
            },
          },
        })
        .toPromise();

      let filteredDevices = [...physical_devices];

      if (this.currentEcosystem !== 'todos') {
        filteredDevices = physical_devices.filter(
          (d) => this.cumulusByEcosystem[this.currentEcosystem].findIndex((cum) => cum.id == d.cumulus_id) > -1
        );
      }

      const devicesType = _.groupBy(filteredDevices, (v) => v.device.type.toLowerCase());

      const typeLabels = [];
      const typeSeries = [];
      Object.keys(devicesType).forEach((key) => {
        typeLabels.push(key);
        typeSeries.push(devicesType[key].length);
      });

      this.devicesTypeChart.labels = typeLabels;
      this.devicesTypeChart.series = typeSeries;

      const devicesStatus = _.groupBy(filteredDevices, (v) => v.status.toLowerCase());
      const statusLabels = [];
      const statusSeries = [];
      Object.keys(devicesStatus).forEach((key) => {
        if (key !== 'inactivo') {
          const current: any = _.groupBy(devicesStatus[key], (v) => v.device.type.toLowerCase());
          Object.keys(current).forEach((item) => {
            statusLabels.push(`${item} ${key}`);
            statusSeries.push(current[item].length);
          });
        }
      });

      this.devicesStatusChart.labels = statusLabels;
      this.devicesStatusChart.series = statusSeries;

      //active devices
      const activeDevices = _.groupBy(devicesStatus.activo, (v) => v.device.type.toLowerCase());

      const activeLabels = [];
      const activeSeries = [];
      Object.keys(activeDevices).forEach((key) => {
        activeLabels.push(key);
        activeSeries.push(activeDevices[key].length);
      });

      this.activeDevicesChart.labels = activeLabels;
      this.activeDevicesChart.series = activeSeries;
    } catch (error) {
      console.log(error);
    }
  }

  async getFormularios() {
    // pequeños mamiferos
    try {
      const {
        data: { individuals },
      }: any = await this.apollo
        .query({
          query: getIndividuals,
          variables: {
            pagination: {
              limit: 5000,
              offset: 0,
            },
          },
        })
        .toPromise();

      let filteredIndividuals = [...individuals];

      if (this.currentEcosystem !== 'todos') {
        filteredIndividuals = individuals.filter(
          (i) =>
            this.cumulusByEcosystem[this.currentEcosystem].findIndex((cum) => cum.id == i.associated_cumulus.id) > -1
        );
      }

      const individualsGroup = _.groupBy(filteredIndividuals, (i) => i.associated_cumulus.name);

      // dispositivos
      const {
        data: { deployments },
      }: any = await this.apollo
        .query({
          query: getDeployments,
          variables: {
            pagination: {
              limit: 5000,
              offset: 0,
            },
          },
        })
        .toPromise();

      let filteredDeployments = [...deployments];

      if (this.currentEcosystem !== 'todos') {
        filteredDeployments = deployments.filter(
          (d) => this.cumulusByEcosystem[this.currentEcosystem].findIndex((cum) => cum.id == d.cumulus.id) > -1
        );
      }
      const deploymentsGroup = _.groupBy(filteredDeployments, (d) => d.cumulus.name);

      const {
        data: { transects },
      }: any = await this.apollo
        .query({
          query: getTransects,
          variables: {
            pagination: {
              limit: 1000,
              offset: 0,
            },
          },
        })
        .toPromise();

      let filteredTransects = [...transects];

      if (this.currentEcosystem !== 'todos') {
        filteredTransects = transects.filter(
          (t) =>
            this.cumulusByEcosystem[this.currentEcosystem].findIndex((cum) => {
              const cumulo = t.associated_node ? t.associated_node.nomenclatura.split('_')[1] : -1;
              return cum.name == cumulo;
            }) > -1
        );
      }

      const transectsGroup = _.groupBy(filteredTransects, (t) => {
        const cumulo = t.associated_node ? t.associated_node.nomenclatura.split('_')[1] : -1;
        if (cumulo === -1) {
          console.log('//////', t);
        }
        return cumulo;
      });

      // join all
      let byCumulo = {};

      Object.keys(individualsGroup).forEach((i) => {
        if (!!!byCumulo[i]) {
          byCumulo[i] = {};
        }
        byCumulo[i].mamiferos = individualsGroup[i].length;
      });
      Object.keys(deploymentsGroup).forEach((d) => {
        if (!!!byCumulo[d]) {
          byCumulo[d] = {};
        }
        byCumulo[d].camaras = deploymentsGroup[d].filter(
          (deployment) => deployment.device.device.type.toLowerCase() === 'camara'
        ).length;
        byCumulo[d].grabadoras = deploymentsGroup[d].filter(
          (deployment) => deployment.device.device.type.toLowerCase() === 'grabadora'
        ).length;
      });
      Object.keys(transectsGroup).forEach((i) => {
        if (!!!byCumulo[i]) {
          byCumulo[i] = {};
        }
        byCumulo[i].transectos = transectsGroup[i].length;
      });

      const categories = [];
      const camaras = [];
      const grabadoras = [];
      const mamiferos = [];
      const transectos = [];

      Object.keys(byCumulo).forEach((cumulo) => {
        categories.push(`Cúm ${cumulo}`);
        camaras.push(byCumulo[cumulo].camaras ?? 0);
        grabadoras.push(byCumulo[cumulo].grabadoras ?? 0);
        mamiferos.push(byCumulo[cumulo].mamiferos ?? 0);
        transectos.push(byCumulo[cumulo].transectos ?? 0);
      });

      this.formulariosChart.xaxis = {
        labels: {
          rotate: -90,
        },
        categories: categories,
      };
      this.formulariosChart.series[0].data = camaras;
      this.formulariosChart.series[1].data = grabadoras;
      this.formulariosChart.series[2].data = mamiferos;
      this.formulariosChart.series[3].data = transectos;
    } catch (error) {
      console.log(error);
    }
  }

  async getEcosystems() {
    try {
      const { data }: any = await this.apollo
        .query({
          query: getEcosystems,
          variables: {
            pagination: {
              limit: 15,
              offset: 0,
            },
          },
        })
        .toPromise();
      this.ecosystems = data?.ecosystems ?? [];
    } catch (error) {
      console.log(error);
    }
  }

  async getTransects() {
    try {
      const {
        data: { transects },
      }: any = await this.apollo
        .query({
          query: getTransects,
          variables: {
            pagination: {
              limit: 1000,
              offset: 0,
            },
          },
        })
        .toPromise();

      const transectsGroup = _.groupBy(transects, (t) => {
        const cumulo = t.associated_node ? t.associated_node.nomenclatura.split('_')[1] : -1;
        return cumulo;
      });

      Object.keys(transectsGroup).forEach((cumulo) => {});
    } catch (error) {
      console.log(error);
    }
  }

  async ngOnInit() {
    await this.getCumulus();
  }

  async ngAfterViewInit() {
    await this.getEcosystems();
    await this.getVisits();
    await this.getFormularios();
    await this.getDevices();
    await this.getFiles();
    // this.getTransects();
  }
}
