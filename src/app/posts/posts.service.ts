import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = []; // This is reference type TODO: learn about reference types
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
    // return [...this.posts];
    // * [...array] - Spread operator:
    // creates new array and takes all the elements of another array,
    // then posts array here, pull them out of that array and add them to this new array.
    // It creates a new array with the old objects and therefore this array has been copied.

    // If I now edit this array, if I add new elements or remove elements from within another component,
    // this will not work, this will not affect my original array here.
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(id: string, title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}