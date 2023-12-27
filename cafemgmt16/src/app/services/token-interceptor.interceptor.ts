import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  //authService: any;

  constructor(private router:Router,private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=localStorage.getItem('token');
    //const token=this.authService.getToken();
   if(token)
    {
      request=request.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      });
    }
  
    return next.handle(request).pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          console.log(err.url);
          if(err.status === 401 || err.status === 403){
            if(this.router.url === '/'){}
            else{
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
        }
        return throwError(err);
        //return throwError(err);
        //return throwError(() => err);
      })
     )
    // return next.handle(request);
    
   
    /*request=request.clone({
      setHeaders:{Authorization:`Bearer ${token}`}
    });

    return next.handle(request);*/
  }
}
