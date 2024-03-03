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
  getKoboCounters,
} from '@api/tableros';
import { getEcosystems } from '@api/mapa';
import { AlertController } from '@ionic/angular';
import { ApolloQueryResult } from '@apollo/client/core';

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

const updateTimeout = 300;

const inArray = (array) => (input) => _.includes(array, input);

const monthToThreeMountPeriod = (month) => {
  const f = _.cond([
    [inArray([0, 1, 2]), _.constant(1)],
    [inArray([3, 4, 5]), _.constant(2)],
    [inArray([6, 7, 8]), _.constant(3)],
    [inArray([9, 10, 11]), _.constant(4)],
    [_.stubTrue, _.constant(-1)],
  ]);
  return f(month);
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
      height: 400,
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
      height: 400,
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
      height: 300,
      type: 'donut',
    },
    labels: [],
    legend: {
      position: 'bottom',
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
      height: 300,
      type: 'donut',
    },
    labels: [],
    legend: {
      position: 'bottom',
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
      height: 300,
      type: 'donut',
    },
    labels: [],
    legend: {
      position: 'bottom',
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
        text: '',
      },
      min: 0,
      forceNiceScale: true,
      labels: {
        formatter: this.shortNumber,
      },
    },
  };

  filesSizeChart: ApexOptions = {
    series: [
      {
        name: 'TB',
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
        text: '',
      },
      min: 0,
      forceNiceScale: true,
      labels: {
        formatter: this.shortNumber,
      },
    },
  };

  filesAudioChart: ApexOptions = {
    series: [
      {
        name: 'Audio',
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
      title: {
        text: 'Trimestre',
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: '',
      },
      min: 0,
      forceNiceScale: true,
      labels: {
        formatter: this.shortNumber,
      },
    },
  };

  filesAccChart: ApexOptions = {
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
      title: {
        text: 'Trimestre',
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: '',
      },
      min: 0,
      forceNiceScale: true,
      labels: {
        formatter: this.shortNumber,
      },
    },
  };

  filesSizeAccChart: ApexOptions = {
    series: [
      {
        name: 'TB',
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
      title: {
        text: 'Trimestre',
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: '',
      },
      min: 0,
      forceNiceScale: true,
      labels: {
        formatter: this.shortNumber,
      },
    },
  };

  constructor(private alertController: AlertController, private apollo: Apollo, private route: ActivatedRoute) {
    this.cumuloId = this.route.snapshot.paramMap.get('id') || null;
  }

  shortNumber(value: any) {
    if (isNaN(value)) {
      return value;
    }
    let sufix = '';
    if (value >= 1000000) {
      value = value / 1000000;
      sufix = 'M';
    }

    if (value >= 1000) {
      value = value / 1000;
      sufix = 'K';
    }

    const v = Number.isInteger(value) ? value : value.toFixed(2);

    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + sufix;
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

  async partition_files() {
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

      let files: any = _.sortBy(data.file_counts, ['delivery_date']);

      files = _.groupBy(files, (f) => new Date(f.delivery_date).getFullYear());
      Object.keys(files).forEach((key) => {
        files[key] = _.groupBy(files[key], (f) => monthToThreeMountPeriod(new Date(f.delivery_date).getMonth()));
        Object.keys(files[key]).forEach((key2) => {
          files[key][key2] = _.reduce(
            files[key][key2],
            (result, obj) => {
              return {
                audio_files: result.audio_files + obj.audio_files,
                image_files: result.image_files + obj.image_files,
                video_files: result.video_files + obj.video_files,
                size: result.size + obj.size / 1024,
              };
            },
            {
              audio_files: 0,
              image_files: 0,
              video_files: 0,
              size: 0,
            }
          );
        });
      });

      const categories = [];
      const audio = [];
      const video = [];
      const images = [];
      const size = [];
      let audiot = 0;
      let videot = 0;
      let imagest = 0;
      let sizet = 0;

      Object.keys(files).forEach((year) => {
        Object.keys(files[year]).forEach((fourMonthPeriod) => {
          categories.push(`${year}-0${fourMonthPeriod}`);
          audiot += files[year][fourMonthPeriod].audio_files;
          videot += files[year][fourMonthPeriod].video_files;
          imagest += files[year][fourMonthPeriod].image_files;
          sizet += files[year][fourMonthPeriod].size;
          audio.push(audiot);
          video.push(videot);
          images.push(imagest);
          size.push((sizet / 1000000).toFixed(2));
        });
      });

      this.filesAudioChart.series = [
        {
          name: 'Audio',
          data: audio,
        },
      ];
      this.filesAudioChart.xaxis = {
        categories,
      };

      this.filesAccChart.series = [
        {
          name: 'Video',
          data: video,
        },
        {
          name: 'Imágenes',
          data: images,
        },
      ];

      this.filesAccChart.xaxis = {
        categories,
      };

      this.filesSizeAccChart.series = [
        {
          name: 'TB',
          data: size,
        },
      ];

      this.filesSizeAccChart.xaxis = {
        categories,
      };
    } catch (error) {
      console.error('Error al obtener los archivos', error);
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

    files = _.sortBy(files, ['delivery_date']);
    files = _.groupBy(files, (f) => new Date(f.delivery_date).getFullYear());
    Object.keys(files).forEach((key) => {
      files[key] = _.groupBy(files[key], (f) => monthToThreeMountPeriod(new Date(f.delivery_date).getMonth()));
      Object.keys(files[key]).forEach((key2) => {
        files[key][key2] = _.reduce(
          files[key][key2],
          (result, obj) => {
            return {
              audio_files: result.audio_files + obj.audio_files,
              image_files: result.image_files + obj.image_files,
              video_files: result.video_files + obj.video_files,
              size: result.size + obj.size / 1024,
            };
          },
          {
            audio_files: 0,
            image_files: 0,
            video_files: 0,
            size: 0,
          }
        );
      });
    });

    const categories = [];
    const audio = [];
    const video = [];
    const images = [];
    const size = [];

    Object.keys(files).forEach((year) => {
      Object.keys(files[year]).forEach((threeMonthPeriod) => {
        categories.push(`${year}-0${threeMonthPeriod}`);
        audio.push(files[year][threeMonthPeriod].audio_files);
        video.push(files[year][threeMonthPeriod].video_files);
        images.push(files[year][threeMonthPeriod].image_files);
        size.push((files[year][threeMonthPeriod].size / 1000000).toFixed(2));
      });
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
        name: 'TB',
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

      // We need this timeout to get the categories updated correctly on load.
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, updateTimeout);
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

  /**
   * Query for 'z1' Zendro server.
   */
  async getFormularios() {
    try {
      const { data } = (await this.apollo
        .use('kzCounters')
        .query({
          query: getKoboCounters,
          variables: {
            pagination: {
              limit: 5000,
              offset: 0,
            },
          },
        })
        .toPromise()) as ApolloQueryResult<{
        kobo_counters: {
          id: string;
          cumulus: string;
          name: string;
          value: number;
          kobo_asset_uid: string;
          kobo_asset_name: string;
        }[];
      }>;

      const categories = [];
      const camaras = [];
      const grabadoras = [];
      const mamiferos = [];
      const eries = [];

      const camaras_name = 'Cámara Trampa';
      const grabadoras_name = 'Grabadora AudioMoth';
      const mamiferos_name = 'PM';
      const eries_name = 'ERIE';

      const byCumulo = data.kobo_counters.reduce((acc, cur) => {
        //case 1: new cumulus
        if (!acc?.[cur.cumulus]) {
          acc[cur.cumulus] = { [cur.name]: cur.value };
        } else {
          //case 2: cumulus already exist
          acc[cur.cumulus][cur.name] = cur.value + (acc[cur.cumulus][cur.name] ?? 0);
        }
        return acc;
      }, {});

      Object.keys(byCumulo).forEach((cumulo) => {
        categories.push(`Cúm ${cumulo}`);
        camaras.push(byCumulo[cumulo][camaras_name] ?? 0);
        grabadoras.push(byCumulo[cumulo][grabadoras_name] ?? 0);
        mamiferos.push(byCumulo[cumulo][mamiferos_name] ?? 0);
        eries.push(byCumulo[cumulo][eries_name] ?? 0);
      });

      // We need this timeout to get the categories updated correctly on load.
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, updateTimeout);
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
      this.formulariosChart.series[3].data = eries;
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
    await this.partition_files();
    // this.getTransects();
  }
}
