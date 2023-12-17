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
