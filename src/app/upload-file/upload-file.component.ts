import { Component, OnInit } from '@angular/core';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor( public http: Http ) { }

  ngOnInit() {
  }



  public files: UploadFile[] = [];
  public archivos : Array<any>;

    public dropped(event: UploadEvent) {
      this.files = event.files;

      for (const droppedFile of event.files) {

        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;


            fileEntry.file((file: File) => {

            // Here you can access the real file
            //console.log(droppedFile.relativePath, file);


            // You could upload it like this:
            const formData = new FormData()
            formData.append('foto', file, droppedFile.relativePath);
            /**
            // Headers
            const headers = new HttpHeaders({
              'security-token': 'mytoken'
            })
            */
            this.http.post('https://localhost:8080/archivo/', formData)
            .subscribe(data => {
              // Sanitized logo returned from backend
            })


          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.log(droppedFile.relativePath, fileEntry);
        }
      }
    }

    public fileOver(event){
      //console.log(event);
    }

    public fileLeave(event){
      //console.log(event);
    }


}
