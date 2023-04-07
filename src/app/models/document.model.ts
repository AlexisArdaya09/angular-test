import { Annotation } from './annotation.model';

export interface OrdersResponseDataForGraphics {
  id: number;
  name: string;
  description: string;
  pages: Page[];
}

export interface Page {
  id: number;
  imageUrl: string;
  annotations: Annotation[];
}
