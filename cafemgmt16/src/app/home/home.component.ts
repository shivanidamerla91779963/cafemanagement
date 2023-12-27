import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '@app/forgot-password/forgot-password.component';
import { LoginComponent } from '@app/login/login.component';
import { UserService } from '@app/services/user.service';
import { SignupComponent } from '@app/signup/signup.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog,private userServices:UserService,
    private router:Router) { }

 ngOnInit(): void {
    this.userServices.checkToken().subscribe((response:any)=>{
      this.router.navigate(['/cafe/dashboard']);
      //this.router.navigate(['/']);
    },(error:any)=>{
      console.log(error);
    }
    )


  }
 // ngOnInit() {}

  handleSignupAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width="550px";
    this.dialog.open(SignupComponent,dialogConfig);
  }


  handleForgotPasswordAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width="550px";
    this.dialog.open(ForgotPasswordComponent,dialogConfig);
  }

  handleLoginAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width="550px";
    this.dialog.open(LoginComponent,dialogConfig);
  }



}
