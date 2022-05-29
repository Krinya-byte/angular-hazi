import { Component, OnInit, TemplateRef } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

/*
FileUploadComponent for uploading the files from the computer
*/
export class FileUploadComponent implements OnInit {
   //using localfilelist, to show the files on the drag and drop item
  localfileList: File[] = [];

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onSelect(event): void{
    this.localfileList.push(...event.addedFiles)
    this.fileUploadService.clearFiles();
    this.fileUploadService.UploadFiles(this.localfileList);
  }


  onRemove(event: File) {
    this.localfileList.splice(this.localfileList.indexOf(event), 1);
  }


}
