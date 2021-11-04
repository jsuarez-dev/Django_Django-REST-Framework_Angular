import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormFilesComponent } from './form-files.component';

describe('FormFilesComponent', () => {
  let component: FormFilesComponent;
  let fixture: ComponentFixture<FormFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [ FormFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('file initial state', () => {
    expect(component.uploadFile.valid).toBeFalsy();
    const html: HTMLElement = fixture.nativeElement;
    const title = html.querySelector('ion-title')!;
    expect(title.textContent).toEqual('Upload your file');
    
    const summit = html.querySelector('#summit')!;
    expect(summit.textContent).toEqual('Submit');
    
    const reset = html.querySelector('#reset')!;
    expect(reset.textContent).toEqual('Clear');
  });

it('Send form with out file', () => {
  const summit = fixture.debugElement.nativeElement.querySelector('#summit')!;
  expect(summit.textContent).toEqual('Submit');
  summit.click()
  expect(component.uploadFile.valid).toBeFalsy()
  expect(component.hasError('file', 'required')).toBeFalsy()    
})

});
