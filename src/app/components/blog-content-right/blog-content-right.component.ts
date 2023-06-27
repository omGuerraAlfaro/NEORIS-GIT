import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from 'src/app/services/blog-services.service';

@Component({
  selector: 'app-blog-content-right',
  templateUrl: './blog-content-right.component.html',
  styleUrls: ['./blog-content-right.component.css']
})
export class BlogContentRightComponent {
  contentMostView: any[] = [];
  contentFeature: any[] = [];

  constructor(private blogService: BlogService, private http: HttpClient) { }
  private blogsSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.blogsSubscription = this.blogService.blogs$.subscribe(blogs => {
      this.contentMostView = blogs.slice(0, 4);
      this.contentFeature = blogs.slice(0, 4);
      console.log(blogs);
    });
  }

  ngOnDestroy(): void {
    if (this.blogsSubscription) {
      this.blogsSubscription.unsubscribe();
    }
    
  }
  
}




// contentMostView = [
//   {
//     titulo: 'Título de Prueba NEORIS SABE COMO AYUDAR A LAS EMPRESAS A TRANSFORMARSE DIGITALMENTE',
//     fecha: '08/07/2021',
//     texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quod adipisci quam cumque placeat atque corporis, eum in impedit delectus, enim culpa, voluptate ratione! Officia optio recusandae ea quia officiis.',
//     link: 'http://link-del-blog-1.com'
//   },
//   {
//     titulo: 'Título de Prueba NEORIS SABE COMO AYUDAR A LAS EMPRESAS A TRANSFORMARSE DIGITALMENTE',
//     fecha: '08/07/2021',
//     texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quod adipisci quam cumque placeat atque corporis, eum in impedit delectus, enim culpa, voluptate ratione! Officia optio recusandae ea quia officiis.',
//     link: 'http://link-del-blog-1.com'
//   },
//   {
//     titulo: 'Título de Prueba NEORIS SABE COMO AYUDAR A LAS EMPRESAS A TRANSFORMARSE DIGITALMENTE',
//     fecha: '08/07/2021',
//     texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quod adipisci quam cumque placeat atque corporis, eum in impedit delectus, enim culpa, voluptate ratione! Officia optio recusandae ea quia officiis.',
//     link: 'http://link-del-blog-1.com'
//   }
// ];
// contentFeature = [
//   {
//     titulo: 'Título de Prueba NEORIS SABE COMO AYUDAR A LAS EMPRESAS A TRANSFORMARSE DIGITALMENTE',
//     fecha: '08/07/2021',
//     texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quod adipisci quam cumque placeat atque corporis, eum in impedit delectus, enim culpa, voluptate ratione! Officia optio recusandae ea quia officiis.',
//     link: 'http://link-del-blog-1.com'
//   },
//   {
//     titulo: 'Título de Prueba NEORIS SABE COMO AYUDAR A LAS EMPRESAS A TRANSFORMARSE DIGITALMENTE',
//     fecha: '08/07/2021',
//     texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quod adipisci quam cumque placeat atque corporis, eum in impedit delectus, enim culpa, voluptate ratione! Officia optio recusandae ea quia officiis.',
//     link: 'http://link-del-blog-1.com'
//   },
//   {
//     titulo: 'Título de Prueba NEORIS SABE COMO AYUDAR A LAS EMPRESAS A TRANSFORMARSE DIGITALMENTE',
//     fecha: '08/07/2021',
//     texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quod adipisci quam cumque placeat atque corporis, eum in impedit delectus, enim culpa, voluptate ratione! Officia optio recusandae ea quia officiis.',
//     link: 'http://link-del-blog-1.com'
//   }
// ];