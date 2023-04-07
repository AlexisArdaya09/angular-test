import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public documentId: number = 0;
  public document: any;
  public annotation: Annotation = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    type: 'text',
    content: 'ola',
    id:1
  };
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

    this.documentControlService.controlsUpdates
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((documentControl) => {
        if (documentControl) {
          this.zoomPercentage = documentControl.zoomPercentage
        }
      });
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
