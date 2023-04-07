export interface Annotation {
  type: 'text' | 'image' | null;
  x: number;
  y: number;
  content: string;
  id:number;
  pageId:number;
}
