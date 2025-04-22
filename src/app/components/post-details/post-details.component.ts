import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { Ipostbyid } from '../../core/interfaces/ipostbyid';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-details',
  imports: [DatePipe],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent {
  activatedRoute=inject(ActivatedRoute)
  postsService=inject(PostsService)
currentPost!:Ipostbyid
  ngOnInit(): void {
  this.getCurrentId()
  }

  getCurrentId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
console.log(param.get('id'));
this.getCurrentPost(param.get('id') !)
      }
    })
  }

  getCurrentPost(id:string):void{
    this.postsService.getSinglePost(id).subscribe({
      next:(res)=>{
this.currentPost=res
console.log(res);

      }
    })
  }
}
