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

  it('file field validity', () => {
    expect(component.uploadFile.valid).toBeFalsy();
    const fileList = { 0: { name: 'foo', size: 500001 } };
    let errors = {};
    let upload = component.uploadFile['upload'].setValue({target: {'upload' : fileList}});
    expect(component.uploadFile.valid).toBeTruthy();

    component.submit();
    expect(component.success).toBe(true);
  });
});
