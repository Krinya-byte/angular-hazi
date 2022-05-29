import { Component, OnInit, TemplateRef } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {

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
