import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { RouterModule, Routes } from '@angular/router';
import { DocumentAnnotationModule } from '../../shared/components/document-annotation/document-annotation.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: DocumentViewerComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DocumentViewerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocumentAnnotationModule
  ]
})
export class DocumentViewerModule { }
