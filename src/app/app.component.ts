import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogService } from './services/blog-services.service';
import { ViewStateService } from './services/state-service.service';


declare const Liferay: any;

@Component({
  selector: 'search-portlet-neoris',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //views
  hideLeftContent = true;
  changeSizeContent = true;
  

  title = 'search-portlet-neoris';
  token?: string;
  private readonly LIFERAY_API = 'http://192.168.1.32:8080/o/c/blogs/';

  constructor(private http: HttpClient, private blogService: BlogService, private viewStateService: ViewStateService) { }

  ngOnInit(): void {
    this.token = Liferay.authToken;
    if (!this.token) {
      console.error('Token is not defined');
      return;
    }
    this.http.get<any>(this.LIFERAY_API, {
      headers: {
        'x-csrf-token': this.token
      }
    }).subscribe({
      next: (data: any) => {
        this.blogService.updateBlogs(data.items);
      },
      error: (err) => { console.error(err); }
    });


    this.viewStateService.state$.subscribe(state => {
      if (state === 0) {
        this.hideLeftContent = true;
      }
      if (state === 1) {
        this.hideLeftContent = false;
      }
      if (state === 2) {
        this.hideLeftContent = false;
      }
      if (state === 3) {
        this.hideLeftContent = false;        
      }
    });
  }



}