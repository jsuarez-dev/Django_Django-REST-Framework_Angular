import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { finalize } from 'rxjs/operators';

interface fileData {
  id: number;
  name :string; 
  file: string;
  size: number;
  uploaded: Date | null;
  ext: string;
}

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  @Input() fileUploaded
  
  data : fileData[];
  private API_URL = environment.apiUrl
  

  constructor(private http: HttpClient) {
    this.data = null
  }

  ngOnInit(): void {
    this.fetchData()
  }

  ngOnChanges() {
    this.fetchData()
  }

  isPdf(fileName) {
    const extension = fileName.split('.')[1].toLowerCase();    
    if (extension.toLowerCase() === 'pdf' ) {
      return true;
    } else {
      return false
    }
  }

  readableSize(size:number): string {

    let sizerStr :string
    if (size < 1024) {
      
      sizerStr = `${size}B`  
    } else if (size >= 1024 && size < (1024**2)) {
      const newSize = size/1024
      sizerStr = `${newSize.toFixed(2)} KB` 
    } else if (size >= (1024**2) && size < (1024**3)) {
      const newSize = size/(1024**2)
      sizerStr = `${newSize.toFixed(2)} MB` 
    } else if (size >= (1024**3) && size < (1024**4)) {
      const newSize = size/(1024**3)
      sizerStr = `${newSize.toFixed(2)} GB` 
    }
    return sizerStr
  }

  fetchData() {
    this.http.get(this.API_URL).subscribe(
      (res : fileData[]) => {
        this.data = res.map( obj => {
          return {...obj, 
          ext: obj.name.split('.')[1].toLowerCase()
          }
        })
      }, (err) => {
        this.data = [{
          id: 0,
          name : 'none files', 
          file: 'string',
          size: 0,
          uploaded: null,
          ext: 'string',
        }]
      }
    )
  }

}
