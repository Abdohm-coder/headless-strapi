export interface Picture {
  data?: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

export interface INavbarLinks {
  label: string;
  children: Array<{
    label: string;
    description: string;
    url: string;
    is_external?: boolean;
    picture: Picture;
  }>;
}

export interface IHero {
  id: string;
  title: string;
  description: string;
  featured_image: Picture;
  wordmark?: Picture;
  buttons: Button[];
}

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface Button {
  id: string;
  url: string;
  text: string;
  type: ButtonType;
  newTab: boolean;
}
