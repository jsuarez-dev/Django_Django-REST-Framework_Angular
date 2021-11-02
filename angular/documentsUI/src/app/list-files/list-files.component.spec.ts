import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { ListFilesComponent } from './list-files.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

interface fileData {
  id: number;
  name :string; 
  upload: string;
  ext: string;
}

describe('ListFilesComponent', () => {
  let component: ListFilesComponent;
  let fixture: ComponentFixture<ListFilesComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [ ListFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  it('should create', () => {
    expect(component).toBeDefined();
    const titleElement: HTMLElement = fixture.nativeElement;
    const title = titleElement.querySelector('ion-title')!;
    expect(title.textContent).toEqual('List of files');
  });

  it('test the API request result', () => {
    expect(component.fileUploaded).toBeFalsy()
    const dataExpected = [{
      id: 1,
      name: 'mypdf.pdf',
      upload: 'http://localhost/storage/pdf/mypdf.pdf'
    }]
    
    //tpClientSpy.get.and.returnValues(dataExpected)
  })

  it('test distribution', () => {
    expect(component.fileUploaded).toBeFalsy()
  })
});
