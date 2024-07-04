

export interface IProductItem {
  id: number;
  imageUrl: string;
  price: number;
  title: string;
  category?: string;
}

export interface IUserDataState {
  name?: string;
  surname?: string;
  email?: string;
}

export interface IEditField {
  name?: boolean;
  surname?: boolean;
  email?: boolean;
}

export interface IDataMainNavigation {
  icon?: JSX.Element;
  label?: string;
  to: string;
  id: number;
}
