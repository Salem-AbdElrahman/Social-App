import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) { }
  private readonly router=inject(Router)

  signUp(data:object):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}users/signup`,data)
  }
  signIn(data:object):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}users/signin`,data)
  }
  changePassword(data:object):Observable<any>{
    return this.httpClient.patch(`${enviroment.baseUrl}users/change-password`,data)
  }
  uploadProfilePhoto(data:object):Observable<any>{
    return this.httpClient.put(`${enviroment.baseUrl}users/upload-photo`,data)
  }
  getLoggedUserData():Observable<any>{
    return this.httpClient.get(`${enviroment.baseUrl}users/profile-data`)
  }

  logOut():void{
    localStorage.removeItem('socialToken')
    this.router.navigate(['/signin'])
  }
}
