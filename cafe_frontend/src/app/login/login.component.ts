import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '@app/services/snackbar.service';
import { UserService } from '@app/services/user.service';
import { GlobalConstants } from '@app/shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide=true;
  loginForm:any=FormGroup;
  responseMessage:any;


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    public dialogRef:MatDialogRef<LoginComponent>,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService
    ){}

ngOnInit():void{
  this.loginForm=this.formBuilder.group({
    email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
    password:[null,[Validators.required]]
  })
}

handleSubmit()
{
  this.ngxService.start;
  var formData=this.loginForm.value;
  var data={
    email:formData.email,
    password:formData.password,

  }
  this.userService.login(data).subscribe((response:any)=>{
    this.ngxService.stop();
    this.dialogRef.close();
    const jwtToken = response.token;
    localStorage.setItem('token',jwtToken);
    this.router.navigateByUrl("/cafe/dashboard");

  },(error)=>{
    this.ngxService.stop();
    if(error.error?.message){
      this.responseMessage=error.error?.message;
    }
    else{
      this.responseMessage=GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
  });
}



}
