export interface TeamMember {
  id: string;
  name: string;
  area: string;
  description: string[];
  imgSrc: string;
  styles?: {
    photo?: {
      divHover?: any;
      img?: any;
      imgHover?: any;
    };
  };
}
