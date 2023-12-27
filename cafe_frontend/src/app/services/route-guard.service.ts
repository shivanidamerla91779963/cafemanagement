import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { GlobalConstants } from '@app/shared/global-constants';
import {jwtDecode} from 'jwt-decode';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  constructor(public auth:AuthService,
    public router:Router,
    private snackbarService:SnackbarService) { }

canActivate(route:ActivatedRouteSnapshot):boolean
{
  let expectedRoleArray=route.data;
  expectedRoleArray=expectedRoleArray['expectedRole'];

  const token:any=localStorage.getItem('token');

  var tokenPayload:any;
  try{
    //tokenPayload=jwt_decode(token);
    tokenPayload=jwtDecode(token);
  }
  catch(err){
    localStorage.clear();
    this.router.navigate(['/']);
  }
  
let expectedRole='';

for(let i=0;i<expectedRoleArray['length'];i++)
{
  if(expectedRoleArray[i]==tokenPayload.role)
  {
    expectedRole=tokenPayload.role;
  }
}


if(tokenPayload.role=='user'|| tokenPayload.role=='admin'){
  if(this.auth.isAuthenticated() && tokenPayload.role==expectedRole)
  {
    return true;
  }
  this.snackbarService.openSnackBar(GlobalConstants.unauthorized,GlobalConstants.error);
  this.router.navigate(['/cafe/dashboard']);
  return false;
}
else{
  this.router.navigate(['/']);//to navigate to home page
  localStorage.clear();
  return false;
}

}

}
