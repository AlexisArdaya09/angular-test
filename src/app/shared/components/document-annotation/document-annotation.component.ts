import { Component, Input, OnInit } from '@angular/core';
import { Annotation } from '../../../models/annotation.model';
import { Page } from '../../../models/document.model';

@Component({
  selector: 'app-document-annotation',
  templateUrl: './document-annotation.component.html',
  styleUrls: ['./document-annotation.component.scss'],
})
export class DocumentAnnotationComponent implements OnInit {
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

  ngOnInit(): void {}

  addAnnotation($event: any): void {
    const annotationsOnHold = this.page.annotations.filter(
      (annotation) => !annotation.type
    );
    if (this.canCreateAnnotation && annotationsOnHold.length === 0) {
      $event.stopPropagation();
      const lastIndex =
        this.page.annotations.length === 0
          ? 1
          : this.page.annotations.length + 1;
      this.page.annotations.push({
        x: $event.offsetX,
        y: $event.offsetY,
        type: null,
        content: '',
        id: lastIndex,
        pageId: this.page.id,
      });
    } else {
      this.saveValue($event);
    }
  }

  delete($event: any, annotationId: number) {
    $event.stopPropagation();
    this.page.annotations = this.page.annotations.filter(
      (annotation) => annotation.id !== annotationId
    );
    this.canCreateAnnotation = true;
  }

  addImage($event: any, annotation: Annotation) {
    $event.stopPropagation();
    annotation.type = 'image';
    this.currentAnnotation = annotation;
    this.canCreateAnnotation = false;
  }

  saveImage($event: any) {
    $event.stopPropagation();
    const target = $event.target;
    if (target instanceof HTMLInputElement) {
      const file = target.files? target.files[0]: null;
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.content = reader.result as string;
          this.saveValue($event);
        };
      }
    }
  }

  addText($event: any, annotation: Annotation) {
    $event.stopPropagation();
    annotation.type = 'text';
    this.currentAnnotation = annotation;
    this.canCreateAnnotation = false;
  }

  saveValue($event: any) {
    $event.stopPropagation();
    if (!this.currentAnnotation || !this.content) return;

    this.currentAnnotation.content = this.content;

    this.content = '';
    this.currentAnnotation = null;
    this.canCreateAnnotation = true;
  }

  onAnnotationMouseDown(event: MouseEvent, annotation: Annotation) {
    event.stopPropagation();
    this.isAnnotationDragging = true;
  }

  onAnnotationMouseMove(event: any, annotation: Annotation) {
    event.stopPropagation();

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
    this.isAnnotationDragging = false;
  }
}
