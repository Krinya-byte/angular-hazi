import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {Route, RouterModule} from '@angular/router';
import {ImageResultComponent} from './components/image-result/image-result.component';
import {ImageProcessService} from './services/image-process-service/image-process.service';
import {CommonModule} from '@angular/common';
import {FileUploadComponent} from './components/file-upload/file-upload/file-upload.component';
import {FileUploadService} from './services/file-upload/file-upload.service';
import {FaceDetailsComponent} from './components/face-details/face-details.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import {MatTabsModule} from "@angular/material/tabs";


let routes: Route[] = [
  {path: "image-result", children: [
      {path: ":id/details", component: FaceDetailsComponent},
    ], component: ImageResultComponent,},
  {path: "file-upload", component: FileUploadComponent},
  {path: "image-preview", component: ImagePreviewComponent},
  {path: "", redirectTo: "file-upload", pathMatch : "full"}
];

@NgModule({
  declarations: [
    AppComponent,
    ImageResultComponent,
    FileUploadComponent,
    FaceDetailsComponent,
    ImagePreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDropzoneModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [ImageProcessService, FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
