import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Annotation } from 'src/app/models/annotation.model';
import { DocumentViewerService } from 'src/app/shared/services/document-viewer/document-viewer.service';
import { DocumentControlsService } from '../../../shared/components/document-controls/document-controls.service';
import { Page } from '../../../models/document.model';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss'],
})
export class DocumentViewerComponent implements OnInit {
  public documentId: number = 0;
  public document: any;
  public zoomPercentage: number = 100;

  public error = "";
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentViewerService,
    private documentControlService: DocumentControlsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentId = params['id'];
      this.getDocument();
    });

    this.documentControlService.$controlsUpdates
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((documentControl) => {
        if (documentControl) {
          this.zoomPercentage = documentControl.zoomPercentage
        }
      });

      this.documentControlService.$saveAnnotations
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        if (value) {
          const annotations = this.getAnnotations();
          console.log(annotations)
        }
      });
  }

  getAnnotations(){
    const annotations: any[] = [];
    this.document.pages.forEach((page: Page) => {
        page.annotations.filter(annotation => annotation.type).forEach((annotation: Annotation) => {
            annotations.push(annotation);
        })
    });
    return annotations;
  }

  getDocument(): void {
    this.error = "";
    this.documentService.getDocument(this.documentId).subscribe({
      next: (document) => {
        this.document = document;
      },
      error: (error) => {
        this.error = "Document not found";
      }
    });
  }
}
