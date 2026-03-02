import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>This is your home page.</p>

      <div class="posts-section">
        <h2>Recent Posts</h2>
        <div *ngIf="loading" class="loading">Loading posts...</div>
        <div *ngIf="error" class="error">{{ error }}</div>
        <div *ngFor="let post of posts" class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <small>{{ post.date | date }}</small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .posts-section {
      margin-top: 30px;
    }
    .post-card {
      border: 1px solid #ddd;
      padding: 15px;
      margin: 10px 0;
      border-radius: 5px;
      background: #f9f9f9;
    }
    .post-card h3 {
      margin-top: 0;
      color: #333;
    }
    .loading, .error {
      padding: 15px;
      text-align: center;
    }
    .error {
      color: red;
      background: #ffe6e6;
      border-radius: 5px;
    }
  `]
})
export class HomePage implements OnInit {
  posts: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load posts';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
