import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentAnnotationComponent } from './document-annotation.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DocumentAnnotationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DocumentAnnotationComponent
  ]
})
export class DocumentAnnotationModule { }
