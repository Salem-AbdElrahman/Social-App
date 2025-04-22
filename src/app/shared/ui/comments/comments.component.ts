import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { ICommemt } from '../../../core/interfaces/icommemt';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-comments',
  imports: [DatePipe , ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
private readonly commentsService=inject(CommentsService)
@Input({required:true}) postId!:string

commentList:ICommemt[]= []
commentGroup!:FormGroup


  ngOnInit(): void {



    this.commentGroup =new FormGroup({
      content:new FormControl(null),
      post:new FormControl(this.postId),
    })
    this.commentsService.getPostComments(this.postId).subscribe({
      next:(res)=>{
        console.log(`postId${this.postId}`,res.comments);
     this.commentList=res.comments.reverse();
      }
    })
  }

  sendComment():void{
    this.commentsService.createComment(this.commentGroup.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.commentList=res.comments.reverse();
        this.commentGroup.get('content')?.reset();

      }
    })
  }
}
