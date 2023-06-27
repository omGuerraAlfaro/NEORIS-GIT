import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogSubject = new BehaviorSubject<any[]>([]);
  public blogs$ = this.blogSubject.asObservable();

  updateBlogs(blogs: any[]): void {
    this.blogSubject.next(blogs);
  }

  /* ************************************************ */


  /* ************************************************ */
  private filteredBlogsSubject = new BehaviorSubject<any[]>([]);
  public filteredBlogs$ = this.filteredBlogsSubject.asObservable();

  updateFilteredBlogs(blogs: any[]): void {
    this.filteredBlogsSubject.next(blogs);
  }
  /* ************************************************ */
}
