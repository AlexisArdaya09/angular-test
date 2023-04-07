import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Annotation } from '../../../models/annotation.model';
import { Page } from '../../../models/document.model';

@Component({
  selector: 'app-document-annotation',
  templateUrl: './document-annotation.component.html',
  styleUrls: ['./document-annotation.component.scss'],
})
export class DocumentAnnotationComponent implements OnChanges {
  @Input() public page: Page = {
    id: 1,
    imageUrl: '',
    annotations: [],
  };

  public content: string = '';

  private isAnnotationDragging: boolean = false;
  private canCreateAnnotation: boolean = true;
  private currentAnnotation: any = null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page'] && changes['page'].currentValue) {
    }
  }

  addAnnotation($event: any): void {
    const annotationsOnHold = this.page.annotations.filter(
      (annotation) => !annotation.type
    );
    if (this.canCreateAnnotation && annotationsOnHold.length === 0) {
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
    } else {
      this.saveInputValue($event);
    }
    console.log(this.page.annotations)
  }

  delete($event: any, annotationId: number) {
    $event.stopPropagation();
    this.page.annotations = this.page.annotations.filter(
      (annotation) => annotation.id !== annotationId
    );
  }

  showInput($event: any, annotation: Annotation) {
    $event.stopPropagation();
    annotation.type = 'text';
    this.currentAnnotation = annotation;
    this.canCreateAnnotation = false;
  }

  saveInputValue($event: any) {
    $event.stopPropagation();
    if(!this.currentAnnotation || !this.content) return;

    this.currentAnnotation.content = this.content;

    this.content = '';
    this.currentAnnotation = null;
    this.canCreateAnnotation = true;
  }

  onAnnotationMouseDown(event: MouseEvent, annotation: Annotation) {
    console.log('onAnnotationMouseDown');
    event.stopPropagation();
    this.isAnnotationDragging = true;
  }

  onAnnotationMouseMove(event: any, annotation: Annotation) {
    event.stopPropagation();
    console.log('onAnnotationMouseMove', this.isAnnotationDragging);
  
    let timeout: any = setTimeout(() => {
      if (this.isAnnotationDragging) {
        const dx = event.offsetX;
        const dy = event.offsetY;
        annotation.x = annotation.x + dx - 20;
        annotation.y = annotation.y + dy - 20;
      }
      clearTimeout(timeout);
      timeout = null;
    }, 300);
  }

  onAnnotationMouseUp() {
    console.log('AnnotationMouseUp');
      this.isAnnotationDragging = false;
  }
}
