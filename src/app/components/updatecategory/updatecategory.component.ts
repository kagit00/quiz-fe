import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrl: './updatecategory.component.css'
})
export class UpdatecategoryComponent {
  category: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdatecategoryComponent>,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {
    this.category = { ...data };
  }

  close(): void {
    this.dialogRef.close();
  }

  updateCategoryData() {
    if (this.category.title == '' || this.category.title == null) {
      this._snackBar.open("Title is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }

    if (this.category.description == '' || this.category.description == null) {
      this._snackBar.open("Description is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
    this.categoryService.updateCategory(this.category).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Category Got Updated Successfully', 'success')
      },
      (error: any) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
  }
}
