import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}
  private platformId = inject(PLATFORM_ID);

  getPosts(): Observable<any[]> {
    let url = '/.netlify/functions/posts';
    if (!isPlatformBrowser(this.platformId)) {
      // If we are on the server, we must provide the full absolute URL.
      // Replace this with your actual Netlify production URL.
      url = `https://css-3d.com${url}`;
    }
    return this.http.get<any[]>(url);
  }
}

