 export interface FaceRecognitionResponse {
    faceId: string;
    faceRectangle: FaceRectangle;
    faceAttributes: FaceAttributes;
  }
  
  export interface FaceAttributes {
    smile: number;
    gender: string;
    age: number;
    glasses: string;
  }
  
  export interface FaceRectangle {
    top: number;
    left: number;
    width: number;
    height: number;
  }