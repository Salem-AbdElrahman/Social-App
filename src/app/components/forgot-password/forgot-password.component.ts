import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private readonly usersService=inject(UsersService)
  private readonly router=inject(Router)
  private readonly id=inject(PLATFORM_ID)
  isLoading:boolean=false
isSuccess:string=''
msgError:string=''
changePassForm:FormGroup=new FormGroup({
  password:new FormControl(null,[Validators.required,Validators.pattern(/.*/)]),
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/.*/)])
})
  submitForm():void{
if(this.changePassForm.valid){
  this.isLoading=true
  this.usersService.changePassword(this.changePassForm.value).subscribe({
    next:(res)=>{
  console.log(res);
  if(res.message==='success'){
this.isLoading=false
setTimeout(() => {
if(isPlatformBrowser(this.id)){
  const token= localStorage.setItem('socialToken',res.token)
  console.log(token);


}
this.router.navigate(['/signin'])

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
