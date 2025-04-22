import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient:HttpClient) { }

  createPost(data:object):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}posts`,data)
  }

  getAllPosts():Observable<any>{
    return this.httpClient.get(`${enviroment.baseUrl}posts?limit=50`)
  }
  getMyPosts():Observable<any>{
    return this.httpClient.get(`${enviroment.baseUrl}users/664bcf3e33da217c4af21f00/posts`)
  }
  getSinglePost(postId:string):Observable<any>{
    return this.httpClient.get(`${enviroment.baseUrl}posts/${postId}`)
  }
  updatePost(postId:string,data:object):Observable<any>{
    return this.httpClient.put(`${enviroment.baseUrl}posts/${postId}`,data)
  }
  deletePost(postId:string):Observable<any>{
    return this.httpClient.delete(`${enviroment.baseUrl}posts/${postId}`)
  }
}
