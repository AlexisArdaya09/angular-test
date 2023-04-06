import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentControlsModule } from '../shared/components/document-controls/document-controls.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'document-viewer',
  },
  {
    path: 'document-viewer',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('../modules/document-viewer/document-viewer.module').then(
        (m) => m.DocumentViewerModule
      ),
  },
  { path: '**', redirectTo: 'document-viewer' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DocumentControlsModule],
  declarations: [AppComponent, MainLayoutComponent, TopBarComponent],
  exports: [AppComponent],
})
export class AppRoutingModule {}
