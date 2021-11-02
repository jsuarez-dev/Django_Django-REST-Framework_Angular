import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface fileData {
  id: number;
  name :string; 
  upload: string;
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
          upload: 'string',
          ext: 'string',
        }]
      }
    )
  }

}
