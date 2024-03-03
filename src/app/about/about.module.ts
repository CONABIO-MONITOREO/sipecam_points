import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

import { TeamComponent } from './components/team/team.component';
import { TeamMemberComponent } from './components/team-member/team-member.component';
import { ProjectComponent } from './components/project/project.component';
import { IntroComponent } from './components/intro/intro.component';

@NgModule({
  imports: [CommonModule, TranslateModule, IonicModule, AboutRoutingModule],
  declarations: [AboutComponent, TeamComponent, TeamMemberComponent, ProjectComponent, IntroComponent],
})
export class AboutModule {}
