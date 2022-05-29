import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, concatMap, from, map, Observer, of, pipe, Subject, switchMap, take } from 'rxjs';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Observable } from 'rxjs';
import { FaceRecognitionResponse } from 'src/app/models/model';
import { ImageProcessService } from 'src/app/services/image-process-service/image-process.service';
import { IUploadedFile } from 'src/app/models/file';
import { FaceAttributes } from '@azure/cognitiveservices-face/esm/models';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.component.html',
  styleUrls: ['./image-result.component.scss']
})
/*
*Image-result component to view the face detection on the image
*
*/
export class ImageResultComponent implements OnInit {
  //TODO subscriptionKey security issue
  faceApiResponse$: Observable<FaceRecognitionResponse[]>;
  faces: FaceRecognitionResponse[] = []
  subscriptionKey = '4abea019a5114b0dbffa3eb1b5eee44d';
  image: string
  file: File
  @ViewChild('imageLayer', { static: false }) imageLayer: ElementRef;
  private context: CanvasRenderingContext2D;
  private imageLayerElement: any = null;
  offsetX = 0
  offsetY = 0
  faceAttributes: FaceAttributes
  responseGood : boolean = false

  constructor(private imageProcessService: ImageProcessService, private router: Router, private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.image = this.fileUploadService.getFiles()[0].imageSRC
    this.responseGood = this.imageProcessService.scanImage(this.subscriptionKey, this.fileUploadService.getFiles()[0].file)
    this.faces = this.imageProcessService.getFaces()
  }

  ngAfterViewInit(): void {
    this.drawImage()
  }
  
  ngOnDestroy(): void{
    this.clearCanvas()
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.imageLayer.nativeElement.width, this.imageLayer.nativeElement.height);
  }
  //draw the image and the rectangles around the detected faces
  drawImage() {
    var hover = false;
    var image = new Image()
    image.onload = () => {
      image.src = this.image

      this.imageLayerElement = this.imageLayer.nativeElement;
      this.context = this.imageLayerElement.getContext("2d");
      this.imageLayerElement.width = image.width;
      this.imageLayerElement.height = image.height;
      this.drawImageOnCanvas(image);
      //offset for the exact clicking position
      var r = this.imageLayerElement.getBoundingClientRect();
      this.offsetX = r.left;
      this.offsetY = r.top;

      this.drawRectangles();
    }
    image.src = this.image
  }

  private drawImageOnCanvas(image: HTMLImageElement) {
    this.context.drawImage(image, 0, 0, image.width, image.height);
  }

  drawRectangles() {
    var faceRectangles = this.imageProcessService.getFaceRectangles()
    faceRectangles.forEach(faceRectangle => {
      this.drawRect(faceRectangle.top, faceRectangle.left, faceRectangle.width, faceRectangle.height);
    });
  }

  drawRect(top, left, width, height) {
    this.context.beginPath();
    this.context.rect(left, top, width, height);
    this.context.lineWidth = 10;
    this.context.strokeStyle = "red";
    this.context.stroke();
  }
  /*
  *handles the click event, when somebody is clicking on the chosen rectangle
  *redirects to the image-details component
  */
  handleMouseClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    var mouseX = e.clientX - this.offsetX;
    var mouseY = e.clientY - this.offsetY;
    var faces = this.imageProcessService.getFaces()
    faces.forEach(face => {
      let faceRec = face.faceRectangle;
      if(mouseX >= faceRec.left && mouseX <= faceRec.left+faceRec.width && mouseY >= faceRec.top && mouseY <= faceRec.top + faceRec.height){
        this.router.navigateByUrl(`/image-result/${face.faceId}/details`)
      }
    })
  }

}
