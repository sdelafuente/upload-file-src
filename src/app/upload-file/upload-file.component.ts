import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Persona } from '../clases/persona';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

    miPersona = new Persona('', '', '', '');
    public files: UploadFile[] = [];
    public archivos: Array<any>;

    constructor( public http: Http ) { }

    ngOnInit() {}

    public dropped(event: UploadEvent) {
        this.files = event.files;

        for (const droppedFile of event.files) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile && this.verificarPersona() ) {

                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

                fileEntry.file((file: File) => {

                    // You could upload it like this:
                    const formData = new FormData();
                    formData.append('nombre', this.miPersona.nombre );
                    formData.append('email', this.miPersona.email );
                    formData.append('password', this.miPersona.password );
                    formData.append('sexo', this.miPersona.sexo );
                    formData.append('foto', file, droppedFile.relativePath);

                    // console.log( JSON.stringify(this.miPersona) );
                    /** const headers = new HttpHeaders({'security-token': 'mytoken'}) */
                    // {email:mail@mail.com,password:12345678a}
                    this.http.post('http://localhost:8080/archivo/', formData).subscribe(data => {
                        console.log(data);
                    });

                });
            } else {
              // It was a directory (empty directories are added, otherwise only files)
              const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
              console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }

    public fileOver(event) {
      // console.log(event);
    }

    public fileLeave(event) {
      // console.log(event);
    }

    private verificarPersona() {
        if (this.miPersona.nombre === '' || this.miPersona.email === '' || this.miPersona.password === '') {
            console.log('Falta cargar datos ');
            return  false;
        }
        return true;
    }
}
