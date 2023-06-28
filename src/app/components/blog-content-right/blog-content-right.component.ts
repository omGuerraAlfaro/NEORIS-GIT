import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare const Liferay: any;
@Component({
  selector: 'app-blog-content-right',
  templateUrl: './blog-content-right.component.html',
  styleUrls: ['./blog-content-right.component.css']
})
export class BlogContentRightComponent implements OnInit {
  private readonly LIFERAY_API = 'http://192.168.1.32:8080/o/c/blogs/';
  token?: string;
  contentMostView: any[] = [];
  contentFeature: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.token = Liferay.authToken;
    if (!this.token) {
      console.error('Token is not defined');
      return;
    }

    this.http.get<any>(this.LIFERAY_API, {
      headers: new HttpHeaders({
        'x-csrf-token': this.token
      })
    }).subscribe({
      next: (data: any) => {
        const sortedBlogs = data.items.sort((a: any, b: any) => b.viewCount - a.viewCount);
        this.contentMostView = sortedBlogs.slice(0, 4);

        // Filter out the featured blogs
        this.contentFeature = data.items.filter((blog: any) => blog.destacado.key === 'si');

        console.log(sortedBlogs);
      },
      error: (err) => { console.error(err); }
    });
  }


}
