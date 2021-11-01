import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export function toFormData<T>( formValue: T ) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
    console.log(key)
  }
  return formData;
}

export function uploadProgress<T>( cb: ( progress: number ) => void ) {
  return tap(( event: HttpEvent<T> ) => {
    if ( event.type === HttpEventType.UploadProgress ) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function toResponseBody<T>() {
  return pipe(
    filter(( event: HttpEvent<T> ) => event.type === HttpEventType.Response),
    map(( res: HttpResponse<T> ) => res.body)
  );
}

export function markAllAsDirty( form: FormGroup ) {
  for ( const control of Object.keys(form.controls) ) {
    form.controls[control].markAsDirty();
  }
}

export function requiredFileType( types: string[] ) {
  return function ( control: FormControl ) {
    const file = control.value;
    if ( file ) {
      const extension = file.name.split('.')[1].toLowerCase();
      for(const extType of types) {
        if ( extType.toLowerCase() === extension.toLowerCase() ) {
          return null;
        }
      }
      return {
        requiredFileType: true
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-form-files',
  templateUrl: './form-files.component.html',
  styleUrls: ['./form-files.component.css']
})
export class FormFilesComponent {
  @Input() fileUploaded
  @Output() fileHasBeenUploadedEvent = new EventEmitter<boolean>();

  fileTypesAccepted = ['pdf', 'DOCX']

  statusColor = 'dark'
  progress = 0;
  success = false;

  private API_URL = environment.apiUrl

  uploadFile = new FormGroup({
    upload : new FormControl('',[Validators.required, requiredFileType(this.fileTypesAccepted)])
  })

  constructor(private http: HttpClient){}
  
  submit() {
    this.success = false;
    if ( !this.uploadFile.valid ) {
      markAllAsDirty(this.uploadFile);
      return;
    }
    this.statusColor = 'success'
    this.http.post(this.API_URL, toFormData(this.uploadFile.value), {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      uploadProgress(progress => (this.progress = progress)),
      toResponseBody()
    ).subscribe(res => {
      this.progress = 0;
      this.success = true;  
      this.statusColor = 'dark'
      this.wasSuccessful()
      this.uploadFile.reset();
    });
  }

  wasSuccessful() {
    this.fileHasBeenUploadedEvent.emit(true);
  }

  onChange() {
    const control = this.uploadFile.get('upload');
    if (control.status === 'VALID') {
      this.statusColor = 'success'
    } else {
      this.statusColor = 'danger'
    }
  }
 
  hasError( field: string, error: string ) {
    const control = this.uploadFile.get(field);
    
    return control.dirty && control.hasError(error);
  }
}