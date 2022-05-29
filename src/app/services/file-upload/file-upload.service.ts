import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, concatMap, from, Observable, of, take } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import { IUploadedFile } from 'src/app/models/file';


@Injectable({
  providedIn: 'root'
})
/*
*File upload service for getting the file and the image-src
*image-src is for display the image on a canvas
*file is for the Http Post method to the get the data from the API
*/
export class FileUploadService {

  constructor() { }
  // @Output() uploadedFiles: EventEmitter<IUploadedFile> = new EventEmitter();
  uploadedFile: IUploadedFile[] = [];
  string: string  = ""
  // Returns an observable
  
  /*
  *getting the files from the component
  *then make them observable object, and pipe the files for the FileReader class
  *throws error if the file is invalid
  */
  public UploadFiles(files: File[]) {
    const numberOfFiles = files.length;
    from(files)
      .pipe(
        concatMap((file: File) => this.readFile(file).pipe(catchError((error: File) => of(error)))),
        take(numberOfFiles)
      ).subscribe()
  }

  /*
  *creates observable IUPloadedFile
  *creates an imageSRC
  *then the IUploadedFile structure gets the file and the image
  */
  private readFile(file: File): Observable<IUploadedFile>  {
    const fileReader = new FileReader();

     return new Observable((observer: Observer<IUploadedFile>) => {
      fileReader.readAsDataURL(file);
      fileReader.onload = event => {
        // observer.next(file)
        // observer.complete();
        var uploadFile : IUploadedFile = {file : new File([""], "filename", { type: 'text/html' }), imageSRC: "something"}
        uploadFile.imageSRC = fileReader.result as string;
        uploadFile.file = file
        this.uploadedFile.push(uploadFile as IUploadedFile)
      }
      fileReader.onerror = () => {
        observer.error({ error: { name, errorMessage: 'INVALID_FILE' } });
      };
    });
  }

  public getFiles(): IUploadedFile[] {
    //console.log(this.uploadedFile[0])
    return this.uploadedFile
  }
  public clearFiles(){
    this.uploadedFile = []
  }
}
