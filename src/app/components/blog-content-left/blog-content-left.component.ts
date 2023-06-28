import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from 'src/app/services/blog-services.service';


@Component({
  selector: 'app-blog-content-left',
  templateUrl: './blog-content-left.component.html',
  styleUrls: ['./blog-content-left.component.css']
})
export class BlogContentLeftComponent implements OnInit {
  public isCustomSelected: boolean = false;
  startDate?: Date;
  endDate?: Date;

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



  filterByDate(filter: string): void {
    this.isCustomSelected = filter === 'custom';
    let start: Date;
    let end: Date;
    const today = new Date();

    switch (filter) {
      case 'semana':
        start = new Date();
        start.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        end = new Date();
        break;
      case 'mes':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'anio':
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear() + 1, 0, 0);
        break;
      case 'custom':
        if (!this.startDate || !this.endDate) {
          return;
        }

        start = new Date(this.startDate);
        end = new Date(this.endDate);
        start = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0, 0));
        end = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999));
        break;


      default: // 'all'
        this.filteredBlogs = this.contentBlog;
        this.blogService.updateFilteredBlogs(this.filteredBlogs);
        return;
    }

    this.filteredBlogs = this.contentBlog.filter(blog => {
      const blogDate = new Date(blog.dateCreated);
      const blogYear = blogDate.getUTCFullYear();
      const blogMonth = blogDate.getUTCMonth();
      const blogDay = blogDate.getUTCDate();

      const startYear = start.getUTCFullYear();
      const startMonth = start.getUTCMonth();
      const startDay = start.getUTCDate();

      const endYear = end.getUTCFullYear();
      const endMonth = end.getUTCMonth();
      const endDay = end.getUTCDate();

      return (blogYear > startYear || (blogYear === startYear && blogMonth > startMonth) || (blogYear === startYear && blogMonth === startMonth && blogDay >= startDay))
        && (blogYear < endYear || (blogYear === endYear && blogMonth < endMonth) || (blogYear === endYear && blogMonth === endMonth && blogDay <= endDay));
    });

    this.blogService.updateFilteredBlogs(this.filteredBlogs);
  }



}
