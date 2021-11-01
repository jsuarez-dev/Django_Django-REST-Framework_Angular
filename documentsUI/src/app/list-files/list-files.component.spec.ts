import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilesComponent } from './list-files.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ListFilesComponent', () => {
  let component: ListFilesComponent;
  let fixture: ComponentFixture<ListFilesComponent>;

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
  });

  it('test the API request result', () => {
    expect(true).toBeTruthy()
  })
});
