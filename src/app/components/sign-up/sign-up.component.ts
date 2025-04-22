import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

 private readonly usersService=inject(UsersService)
 private readonly router=inject(Router)
 isLoading:boolean=false
 msgError:string=''
 isSuccess:string=''
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/.*/)]),
    rePassword:new FormControl(null,Validators.required),
    dateOfBirth:new FormControl(null,[Validators.required]),
    gender:new FormControl(null,[Validators.required]),
  },{validators:this.confirmPassword})
  submitForm():void{
if(this.registerForm.valid){
  this.isLoading=true
  this.usersService.signUp(this.registerForm.value).subscribe({
    next:(res)=>{
  console.log(res);
  if(res.message==='success'){
this.isLoading=false
setTimeout(() => {
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
  confirmPassword(group:AbstractControl){
const password=group.get('password')?.value
const rePassword=group.get('rePassword')?.value
return password === rePassword ? null : {mismatch:true}
  }
}
