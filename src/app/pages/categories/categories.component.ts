import { Component, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { UpdatecategoryComponent } from '../../components/updatecategory/updatecategory.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  constructor(private categoryService: CategoryService, private logInService: LoginService, private dialog: MatDialog) { }

  categories: { cid: string, title: string, description: string }[] = []
  displayedCategoriesGrid: { cid: string, title: string, description: string }[] = []
  displayedCategoriesList: { cid: string, title: string, description: string }[] = []
  gridPageSize: number = 6;
  listPageSize: number = 3;
  gridPageSizeOptions: number[] = [3, 5, 6];
  listPageSizeOptions: number[] = [2, 3];

  ngOnInit(): void {
    this.getAllCategories()
  }

  viewMode: 'grid' | 'list' = 'list';

  toggleView(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.displayedCategoriesGrid = this.categories.slice(0, 6);
    this.displayedCategoriesList = this.categories.slice(0, 3);
  }

  openModalForCategoryAddition() {
    this.dialog.open(AddcategoryComponent);
  }

  openModalForCategoryUpdate(category: any) {
    this.dialog.open(UpdatecategoryComponent, {data: category});
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data.body;
        this.displayedCategoriesGrid = this.categories.slice(0, this.gridPageSize);
        this.displayedCategoriesList = this.categories.slice(0, this.listPageSize);
      },
      (error: any) => {
        if (error.status === 401)
          this.logInService.logOut()
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
  }

  onPageChangeGrid(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedCategoriesGrid = this.categories.slice(startIndex, endIndex);
  }

  onPageChangeList(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedCategoriesList = this.categories.slice(startIndex, endIndex);
  }

  deleteCategoryByCategoryCode(cid: string) {
    this.categoryService.deleteCategory(cid).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Category Got Deleted Successfully', 'success')
      },
      (error: any) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
  }
}
