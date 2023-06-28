import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from 'src/app/services/blog-services.service';


@Component({
  selector: 'app-blog-content-left',
  templateUrl: './blog-content-left.component.html',
  styleUrls: ['./blog-content-left.component.css']
})
export class BlogContentLeftComponent implements OnInit {

  startDate?: any;
  endDate?: any;

  filteredBlogs: any[] = [];
  contentBlog: any[] = [];

  categoryCounts: any = {
    'digitalTransformation': 0,
    'financialServices': 0,
    'health': 0,
    'leadership': 0,
    'manufacturing': 0,
    'telcoYMedia': 0,
  };

  selectedCategories: any = {
    'digitalTransformation': false,
    'financialServices': false,
    'health': false,
    'leadership': false,
    'manufacturing': false,
    'telcoYMedia': false,
  };

  keywords: any = {
    'analytics': false,
    'bigData': false,
    'consumer': false,
    'digital': false,
    'energy': false,
    'financial': false,
    'innovation': false,
    'leadership': false,
    'telecommunications': false,
    'transformation': false,
    'uX': false,
    'web': false,
  }
  constructor(private blogService: BlogService) { }


  /* ****************************************************************** */
  private blogsSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.blogsSubscription = this.blogService.blogs$.subscribe(blogs => {
      blogs.sort((a, b) => {
        let dateA = new Date(a.dateCreated);
        let dateB = new Date(b.dateCreated);
        return dateB.getTime() - dateA.getTime();
      });

      this.contentBlog = blogs;

      for (let blog of blogs) {
        let categoryName = blog.categoria.key;

        if (categoryName in this.categoryCounts) {
          this.categoryCounts[categoryName]++;
        }
      }
      console.log(this.categoryCounts);
    });
  }

  onCheckboxChange(category: string, event: Event): void {
    let isChecked = (event.target as HTMLInputElement).checked;
    this.selectedCategories[category] = isChecked;
    this.updateFilteredBlogs();
  }

  updateFilteredBlogs(): void {
    let selectedCategories = Object.keys(this.selectedCategories).filter(category => this.selectedCategories[category]);
    if (selectedCategories.length === 0) {
      this.filteredBlogs = [...this.contentBlog];
    } else {
      this.filteredBlogs = this.contentBlog.filter(blog => selectedCategories.includes(blog.categoria.key));
    }
    this.blogService.updateFilteredBlogs(this.filteredBlogs);
  }


  onKeywordClick(keyword: string, event: Event): void {
    console.log("Keyword click event triggered");
    let isChecked = (event.target as HTMLInputElement).checked;
    this.keywords[keyword] = isChecked;
    this.updateFilteredBlogsKeywords();
  }

  updateFilteredBlogsKeywords(): void {
    let selectedKeywords = Object.keys(this.keywords).filter(keyword => this.keywords[keyword]);

    if (selectedKeywords.length === 0) {
      this.filteredBlogs = [...this.contentBlog];
    } else {
      this.filteredBlogs = this.contentBlog.filter(blog => {
        if (blog.keyWords && typeof blog.keyWords.key !== 'undefined') {
          console.log('Blog keyword:', blog.keyWords.key);
          console.log('Selected keywords:', selectedKeywords);
          return selectedKeywords.includes(blog.keyWords.key);
        }
        return false;
      });

    }
    this.blogService.updateFilteredBlogs(this.filteredBlogs);
  }

  /* ****************************************************************** */



  //Animation
  showCategories: boolean = false;
  showKeywords: boolean = false;
  showDate: boolean = false;

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  toggleKeywords() {
    this.showKeywords = !this.showKeywords;
  }

  toggleDate() {
    this.showDate = !this.showDate;
  }

  get iconCategories() {
    return this.showCategories ? 'icon-minus' : 'icon-plus';
  }

  get iconKeywords() {
    return this.showKeywords ? 'icon-minus' : 'icon-plus';
  }

  get iconDate() {
    return this.showDate ? 'icon-minus' : 'icon-plus';
  }



  //FECHAS
  filterByDate(filter: string): void {
    let start: Date = new Date(0); // La fecha más antigua posible
    let end: Date = new Date(); // La fecha actual
    const today = new Date();

    switch (filter) {
      case 'semana':
        start = new Date();
        start.setDate(today.getDate() - 7);
        break;
      case 'mes':
        start = new Date();
        start.setMonth(today.getMonth() - 1);
        break;
      case 'anio':
        start = new Date();
        start.setFullYear(today.getFullYear() - 1);
        break;
      case 'custom':
        // Aquí tendrías que obtener las fechas de tus inputs
        // Podría ser algo así:
        // start = new Date(this.fDesde);
        // end = new Date(this.fHasta);
        break;
      default: // 'all'
        start = new Date(0);
        end = new Date();
        break;
    }

    this.filteredBlogs = this.contentBlog.filter(blog => {
      const blogDate = new Date(blog.date);
      return blogDate >= start && blogDate <= end;
    });

    this.blogService.updateFilteredBlogs(this.filteredBlogs);
  }







}
