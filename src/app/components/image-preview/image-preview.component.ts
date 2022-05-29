import { Component, OnInit } from '@angular/core';
import {FileUploadService} from "../../services/file-upload/file-upload.service";

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
/*
*TODO  create a preview for multiple uploaded images
*get the uploaded file
*make a tabulator or pagination for the multiple images
*/
export class ImagePreviewComponent implements OnInit {
  imageList : string[] = []
  selectedTab = 0
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    console.log(this.fileUploadService.getFiles())
    this.fileUploadService.getFiles().forEach( file => {
      this.imageList.push(file.imageSRC)
      console.log(this.imageList)
    })
  }

}
