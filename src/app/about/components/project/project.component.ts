import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  @Input('dark') dark: boolean;
}
