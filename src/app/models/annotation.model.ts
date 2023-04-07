export interface Annotation {
  type: 'text' | 'image' | null;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  id:number;
}
