import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface fileData {
  id: number;
  name :string; 
  upload: string;
}

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  @Input() fileUploaded
  
  data : fileData[];
  listOfFiles : string[];
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

  fetchData() {
    this.http.get(this.API_URL).subscribe(
      (res : fileData[]) => {
        this.data = res
        this.listOfFiles = res.map( obj => obj.name)
      }
    )
  }

}
