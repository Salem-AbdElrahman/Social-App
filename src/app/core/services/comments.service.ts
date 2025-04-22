import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient:HttpClient) { }

  createComment(data:object):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}comments`,data)
  }
  getPostComments(postId:string):Observable<any>{
    return this.httpClient.get(`${enviroment.baseUrl}posts/${postId}/comments`)
  }
  updateComment(commentId:string,data:object):Observable<any>{
    return this.httpClient.put(`${enviroment.baseUrl}comments/${commentId}`,data)
  }
  deleteComment(commentId:string):Observable<any>{
    return this.httpClient.delete(`${enviroment.baseUrl}comments/${commentId}`)
  }
}
