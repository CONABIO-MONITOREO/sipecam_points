import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosComponent } from './eventos.component';
import { EditMonitorComponent } from '@app/monitores/edit-monitor/edit-monitor.component';
import { MonitoresComponent } from '@app/monitores/monitores.component';
import { VisitasComponent } from '@app/visitas/visitas.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    TranslateModule,
    IonicModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    EventosRoutingModule,
  ],
  declarations: [EventosComponent, EditMonitorComponent, MonitoresComponent, VisitasComponent, TooltipComponent],
})
export class EventosModule {}
