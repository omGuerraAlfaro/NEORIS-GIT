import { Component } from '@angular/core';
import { BlogService } from 'src/app/services/blog-services.service';
import { Subscription } from 'rxjs';
import { ViewStateService } from 'src/app/services/state-service.service';
import { HttpClient } from '@angular/common/http';
declare const Liferay: any;



@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.css']
})
export class BlogContentComponent {
  token?: string;
  private readonly LIFERAY_API_PUT = '/o/c/blogs/';
  //views
  changeSizeContent2 = true;
  changeSizeContent3 = true;
  showCardContent = true;

  contentBlog: any[] = [];
  filterCaracteristicasBlog: any[] = [];

  p: number = 1;

  constructor(private blogService: BlogService, private viewStateService: ViewStateService, private http: HttpClient) { }
  private blogsSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.blogsSubscription = this.blogService.blogs$.subscribe(blogs => {
      this.contentBlog = blogs;
    });

    this.blogsSubscription = this.blogService.filteredBlogs$.subscribe(blogs => {
      this.contentBlog = blogs;
    });

    //views
    this.viewStateService.state$.subscribe(state => {
      if (state === 0) {
        this.showCardContent = true;
        this.changeSizeContent2 = true;
        this.changeSizeContent3 = true;
      }
      if (state === 1) {
        this.showCardContent = true;
        this.changeSizeContent2 = true;
        this.changeSizeContent3 = true;
      }
      if (state === 2) {
        this.showCardContent = false;
        this.changeSizeContent2 = false;
        this.changeSizeContent3 = true;
      }
      if (state === 3) {
        this.showCardContent = false;
        this.changeSizeContent2 = true;
        this.changeSizeContent3 = false;
      }
    });
    /* ******************************************** */
    //inicialicion de token
    this.token = Liferay.authToken;
    if (!this.token) {
      console.error('Token is not defined');
      return;
    }

  }

  ngOnDestroy(): void {
    if (this.blogsSubscription) {
      this.blogsSubscription.unsubscribe();
    }
  }



  updateViewCount(blogId: number, viewCount: number): void {

    const url = this.LIFERAY_API_PUT + `${blogId}`;

    // increment viewCount
    const body = { viewCount: viewCount + 1 };

    if (this.token) {
      this.http.put<any>(url, body, {
        headers: {
          'x-csrf-token': this.token
        }
      }).subscribe({
        next: data => console.log(data),
        error: error => console.error('There was an error!', error)
      });
    } else {
      console.error('Token is not defined');
    }
  }

  goToBlogDetail(blog: any) {
    const blogId = blog.id;
    window.location.href = `/web/neoris/blog-detail?id=${blogId}`;
  }

  // goToBlogDetail(blog: any) {
  //   const blogJSON = JSON.stringify(blog);
  //   localStorage.setItem('selectedBlog', blogJSON);
  //   const url = '/web/neoris/blog-detail';
  //   location.href = url;
  // }

  // goToBlogDetail(blog: any) {
  //   Liferay.fire('blogSelected', blog);
  //   const url = '/web/neoris/detail_blog';
  //   location.href = url;
  // }

  // goToBlogDetail(blog: any) {
  //   const blogString = JSON.stringify(blog);
  //   const encodedBlog = encodeURIComponent(blogString);  
  //   const url = Liferay.Util.addParams({ blog: encodedBlog }, '/web/neoris/detail_blog');
  //   location.href = url;
  // }

}



