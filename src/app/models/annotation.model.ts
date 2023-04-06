export interface Annotation {
  type: 'text' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  page: number;
  id: number;
}
