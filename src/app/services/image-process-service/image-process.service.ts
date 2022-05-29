import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Body } from '@angular/http/src/body';
import { result } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { FaceAttributes, FaceRecognitionResponse, FaceRectangle } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessService {

  constructor(private http: HttpClient) { }

  private faceRecognitionResponseList : FaceRecognitionResponse[] = []

  private Url = "https://faceapimat.cognitiveservices.azure.com/face/v1.0/detect"

  scanImage(subscriptionKey: string, imageFile: File) {

    const headers = new HttpHeaders({'Content-Type': 'application/octet-stream','Ocp-Apim-Subscription-Key':subscriptionKey})
    const params = this.getParams();

     this.http.post<FaceRecognitionResponse[]>(
      this.Url,
      imageFile,
      {
        params,
        headers,
      }
    ).subscribe((data) =>{
      this.faceRecognitionResponseList = data;
    }
    )
    if(this.faceRecognitionResponseList === null){
      return false
    }
    return true
  }

  private getHeaders(subscriptionKey: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/octet-stream');
    headers = headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);

    return headers;
  }

  private getParams() {
    const httpParams = new HttpParams()
      .set('returnFaceId', 'true')
      .set('returnFaceLandmarks', 'false')
      .set(
        'returnFaceAttributes',
        'age,gender,smile,glasses'
      );
    return httpParams;
  }

  public getFaceRectangles() : FaceRectangle[] {
    var faceRects : FaceRectangle[] = []
    this.faceRecognitionResponseList.forEach( face => {
        faceRects.push(face.faceRectangle)
    })
    return faceRects;
  }

  public getFaces() : FaceRecognitionResponse[]{
    return this.faceRecognitionResponseList
  }

  public getFaceAttributesById(id :string): FaceAttributes {
    var faceAttr : FaceAttributes = {smile: 1, gender :'maleDefault', age : 1, glasses : 'YesDefault' }
    this.faceRecognitionResponseList.forEach(face =>{
      if(face.faceId === id){
        faceAttr = face.faceAttributes
      }
    })
    return faceAttr;
  }
}
