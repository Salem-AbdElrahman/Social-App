import { Component, inject, PLATFORM_ID } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
private readonly usersService=inject(UsersService)
 private readonly router=inject(Router)
 private readonly id=inject(PLATFORM_ID)

 isLoading:boolean=false
 msgError:string=''
 isSuccess:string=''
  loginForm:FormGroup=new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/.*/)]),
  })
  submitForm():void{
if(this.loginForm.valid){
  this.isLoading=true
  this.usersService.signIn(this.loginForm.value).subscribe({
    next:(res)=>{
  console.log(res);
  if(res.message==='success'){
this.isLoading=false
setTimeout(() => {
if(isPlatformBrowser(this.id)){
  localStorage.setItem('socialToken',res.token)

}
this.router.navigate(['/timeline'])

}, 1000);

this.isSuccess=res.message;
  }

  },
  error:(err)=>{
  console.log(err);
  this.msgError=err.error.error
  this.isLoading=false
  }
  })
}

  }

}
