import { Component, Input, OnInit } from '@angular/core';
import { TeamMember } from './team-member';

@Component({
  selector: 'app-about-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss'],
})
export class TeamMemberComponent implements OnInit {
  @Input() data: TeamMember;
  @Input('dark') dark: boolean;

  hovered: boolean = false;
  photoDivStyle = undefined;
  photoImgStyle = undefined;

  ngOnInit() {
    this.photoImgStyle = this.data?.styles?.photo?.img;
  }

  onMouseEnter() {
    this.hovered = true;
    this.photoDivStyle = this.data?.styles?.photo?.divHover;
    this.photoImgStyle = this.data?.styles?.photo?.imgHover;
  }

  onMouseLeave() {
    this.hovered = false;
    this.photoDivStyle = undefined;
    this.photoImgStyle = this.data?.styles?.photo?.img;
  }

  getDescriptionItemId = (index) => index;
}
