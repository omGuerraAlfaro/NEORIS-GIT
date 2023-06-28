import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from 'src/app/services/blog-services.service';


@Component({
  selector: 'app-blog-content-left',
  templateUrl: './blog-content-left.component.html',
  styleUrls: ['./blog-content-left.component.css']
})
export class BlogContentLeftComponent implements OnInit {


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
    'Analytics': false,
    'Big data': false,
    'Consumer': false,
    'Digital': false,
    'Energy': false,
    'Financial': false,
    'Innovation': false,
    'Leadership': false,
    'Telecommunications': false,
    'Tranformation': false,
    'UX': false,
    'Web': false,
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
        console.log('Blog keyword:', blog.keyWords.key);
        console.log('Selected keywords:', selectedKeywords);
        return selectedKeywords.includes(blog.keyWords.key);
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

}
