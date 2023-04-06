import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Annotation } from 'src/app/models/annotation.model';
import { DocumentViewerService } from 'src/app/shared/services/document-viewer/document-viewer.service';
import { DocumentControlsService } from '../../../shared/components/document-controls/document-controls.service';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss'],
})
export class DocumentViewerComponent implements OnInit {
  public documentId: number = 1;
  public document: any;
  public annotation: Annotation = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    type: 'text',
    content: 'ola',
    page: 1,
    id: 1
  };
  public zoomPercentage: number = 100;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private documentService: DocumentViewerService,
    private documentControlService: DocumentControlsService
  ) {}

  ngOnInit(): void {
    this.getDocument();

    this.documentControlService.controlsUpdates
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((documentControl) => {
        if (documentControl) {
          this.zoomPercentage = documentControl.zoomPercentage
        }
      });
  }

  getDocument(): void {
    this.documentService.getDocument(this.documentId).subscribe((document) => {
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
    this.document.pages.forEach(
      (page: { annotations: any[] }, pageIndex: any) => {
        if (page.annotations) {
          page.annotations.forEach((annotation, annotationIndex) => {
            const newAnnotation = Object.assign({}, annotation);
            newAnnotation.page = pageIndex;
            newAnnotation.id = annotationIndex;
            annotations.push(newAnnotation);
          });
        }
      }
    );
    return annotations;
  }
}
