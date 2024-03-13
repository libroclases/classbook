import { TestBed } from '@angular/core/testing';
import { CrudService } from './crud.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';

describe('CrudService', () => {
  
  let service: CrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AuthModule.forRoot({
          domain: 'dev-tupdibnrpuxah8p3.us.auth0.com',
          clientId: 'oW9EH9gLFZFovbTIEaafmVNwg55iCGim',
        }),
      ]
    });

    // httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(CrudService);
    
  
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });
});
