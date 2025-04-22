
export interface Ipostbyid {
  message: string;
  post: Post;
}

export interface Post {
  _id: string;
  body: string;
  image: string;
  user: User;
  createdAt: string;
  comments: Comment[];
  id: string;
}

export interface Comment {
  _id: string;
  content?: string;
  commentCreator: User;
  post: string;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  photo: string;
}
