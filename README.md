# FaceApiHazi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Basic application for detecting faces in a picture.

Using Microsoft Azure Face API https://azure.microsoft.com/en-us/services/cognitive-services/face/

### Components:
- File-upload component
  - File upload with drag and drop
  - only pictures can be uploaded
- Image-result component
  - Image on a canvas, where the detected faces shows up
- Image-details component
  - Show details of the detected face on an angular-material-component

### Services:
- File upload service:
  - Generate an image-src fro mthe taken file, to view on a Canvas
- Image-process service:
  - Request and handle the data from the API.
