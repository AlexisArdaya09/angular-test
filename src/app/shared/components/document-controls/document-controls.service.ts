import { DocumentControl } from './../../../models/document-control.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentControlsService {
  public $controlsUpdates = new BehaviorSubject<DocumentControl | null>(null);
  public $saveAnnotations = new BehaviorSubject<any>(null);

  constructor() {}

  public resetControlsUpdates() {
    this.$controlsUpdates.next(null);
  }

  public updateControls(documentControl: DocumentControl) {
    this.$controlsUpdates.next(documentControl);
  }

  public saveAnnotations(){
    this.$saveAnnotations.next(true);
  }
}
