import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '@app/services/snackbar.service';
import { UserService } from '@app/services/user.service';
import { GlobalConstants } from '@app/shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgotPasswordForm:any=FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,private userService:UserService,public dialogRef:MatDialogRef<ForgotPasswordComponent>
    ,private ngxService:NgxUiLoaderService,private snackbarService:SnackbarService){

  }

  ngOnInit():void{
    this.forgotPasswordForm=this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
    });
  }


handleSubmit()
{
  this.ngxService.start();
  var formData=this.forgotPasswordForm.value;
  var data={
    email:formData.email
  }
  this.userService.forgotPassword(data).subscribe((response:any)=>{
    this.ngxService.stop();
    this.responseMessage=response?.message;
    this.dialogRef.close();
    this.snackbarService.openSnackBar(this.responseMessage,"");
  },(error)=>{
    this.ngxService.stop();
    if(error.error?.message){
      this.responseMessage=error.error?.message;

    }
    else{
      this.responseMessage=GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
  })
}

}
