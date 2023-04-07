import { Component, OnInit } from '@angular/core';
import { DocumentControlsService } from './document-controls.service';
import { DocumentControl } from '../../../models/document-control.model';

@Component({
  selector: 'app-document-controls',
  templateUrl: './document-controls.component.html',
  styleUrls: ['./document-controls.component.scss'],
})
export class DocumentControlsComponent implements OnInit {
  public controls: DocumentControl = {
    zoomPercentage: 100,
    zoomLevel: 1,
  };
  public minZoomLevel: number = 0.12;
  public maxZoomLevel: number = 1;

  constructor(private documentControlsService: DocumentControlsService) {}

  ngOnInit(): void {}

  zoomIn() {
    if (this.controls.zoomLevel < this.maxZoomLevel) {
      this.controls.zoomLevel += 0.1;
      this.controls.zoomPercentage = this.calcZoomPercentage();
      this.updateZoomLevel();
    }
  }

  zoomOut() {
    console.log(this.controls.zoomLevel)
    if (this.controls.zoomLevel > this.minZoomLevel) {
      this.controls.zoomLevel -= 0.1;
      this.controls.zoomPercentage = this.calcZoomPercentage();
      this.updateZoomLevel();
    }
  }

  updateZoomLevel(){
    this.documentControlsService.updateControls(this.controls);
  }

  calcZoomPercentage(): number{
    return Math.round((this.controls.zoomLevel / this.maxZoomLevel) * 100);
  }

  save(){
    this.documentControlsService.saveAnnotations();
  }
}
