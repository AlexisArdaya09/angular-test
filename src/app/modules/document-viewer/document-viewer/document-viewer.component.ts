import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Annotation } from 'src/app/models/annotation.model';
import { DocumentViewerService } from 'src/app/shared/services/document-viewer/document-viewer.service';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss'],
})
export class DocumentViewerComponent implements OnInit {
  documentId: number = 1;
  document: any;
  annotation: Annotation = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    type: 'text',
    content: "ola"
  }

  constructor(
    private documentService: DocumentViewerService
  ) {}

  ngOnInit(): void {
    this.getDocument();
  }

  getDocument(): void {
    this.documentService.getDocument(this.documentId).subscribe(document => {
      this.document = document;
    });
  }

  addAnnotation(pageIndex: number, annotation: Annotation): void {
    if (!this.document.pages[pageIndex].annotations) {
      this.document.pages[pageIndex].annotations = [];
    }
    this.document.pages[pageIndex].annotations.push(annotation);
  }

  deleteAnnotation(pageIndex: number, annotationIndex: number): void {
    this.document.pages[pageIndex].annotations.splice(annotationIndex, 1);
  }

  saveAnnotations(): void {
    const annotations = this.getAnnotations();
    console.log(JSON.stringify(annotations));
  }

  getAnnotations(): Annotation[] {
    const annotations: Annotation[] = [];
    this.document.pages.forEach((page: { annotations: any[]; }, pageIndex: any) => {
      if (page.annotations) {
        page.annotations.forEach((annotation, annotationIndex) => {
          const newAnnotation = Object.assign({}, annotation);
          newAnnotation.page = pageIndex;
          newAnnotation.id = annotationIndex;
          annotations.push(newAnnotation);
        });
      }
    });
    return annotations;
  }
}
