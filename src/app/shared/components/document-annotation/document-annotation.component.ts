import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Annotation } from '../../../models/annotation.model';
import { Page } from '../../../models/document.model';

@Component({
  selector: 'app-document-annotation',
  templateUrl: './document-annotation.component.html',
  styleUrls: ['./document-annotation.component.scss']
})
export class DocumentAnnotationComponent implements OnChanges {

  @Input() public page: Page = {
    id: 1,
    imageUrl: '',
    annotations: []
  };

  private isAnnotationDragging: boolean = false;
  mouseStartX: number = 0;
  mouseStartY: number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['page'] && changes['page'].currentValue){
    }
  }

  addAnnotation($event: any): void {
    $event.stopPropagation();
    const lastIndex = this.page.annotations.length + 1;
    this.page.annotations.push({
      x: $event.offsetX,
      y: $event.offsetY,
      width: 20,
      height: 20,
      type: null,
      content: '',
      id: lastIndex,
    });
  }

  delete($event: any, annotationIndex: number){
    $event.stopPropagation();
    this.page.annotations = this.page.annotations.filter(annotation => annotation.id === annotationIndex)
  }

  showInput($event:any, annotation: Annotation){
    $event.stopPropagation();
    annotation.type = 'text';
  }

  saveInputValue($event: any, annotation: Annotation,inputText:string){
    $event.stopPropagation();
    annotation.content = inputText;
  }
}
