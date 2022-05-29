import {Input, SimpleChanges} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaceAttributes } from 'src/app/models/model';
import { ImageProcessService } from 'src/app/services/image-process-service/image-process.service';

@Component({
  selector: 'app-face-details',
  templateUrl: './face-details.component.html',
  styleUrls: ['./face-details.component.scss'],
  host: {
    class:'details'
  }
})


export class FaceDetailsComponent implements OnInit {
  faceAttributes: FaceAttributes = {smile: 1, gender :'maleDefault', age : 1, glasses : 'YesDefault' }
  faceId : string = ''
  //face-details component, getting the id from the param, and getting the face from the service
  constructor(private router: ActivatedRoute, private imageProcessService: ImageProcessService) {
    this.router.paramMap.subscribe(params => {
      this.faceId = params.get('id')
      this.faceAttributes = this.imageProcessService.getFaceAttributesById(this.faceId);
    })
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void{
  }
}

