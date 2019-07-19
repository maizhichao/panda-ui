export interface INavigation {
  title: string;
  link: string;
  icon?: JSX.Element;
  subLinks?: INavigation[];
}
