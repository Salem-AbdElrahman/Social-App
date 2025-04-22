import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { IPosts } from '../../core/interfaces/iposts';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { CommentsComponent } from '../../shared/ui/comments/comments.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-timeline',
  imports: [DatePipe,CommentsComponent,FormsModule,RouterLink],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
private readonly postsService=inject(PostsService)
id=inject(PLATFORM_ID)
postList:IPosts[]=[]
saveFile!:File  //image
content:string='' //body
skeleton:number[]=[0,1,1,2,3,4,5,6]
  ngOnInit(): void {
    this.postsService.getAllPosts().subscribe({
      next:(res)=>{
        console.log(res);
        console.log(res.posts);
        this.postList=res.posts;
      }
    })
    if(isPlatformBrowser(this.id)){
      const token =localStorage.getItem('socialToken')
      console.log(token);

    }

  }

  changeImage(e:Event):void{
    const input=e.target as HTMLInputElement
    if(input.files && input.files.length > 0){
     this.saveFile=input.files[0];
    }

  }

  createPost():void{
//create formData
const formData=new FormData()
formData.append('body',this.content)
formData.append('image',this.saveFile)
this.postsService.createPost(formData).subscribe({
  next:(res)=>{
     console.log(res);
     this.postList=res.posts;
  }
})
  }
}
