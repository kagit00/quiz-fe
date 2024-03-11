import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent {
  constructor(public dialogRef: MatDialogRef<AddcategoryComponent>, private categoryService: CategoryService, private _snackBar: MatSnackBar) {}

  category = {
    'categoryCode': '',
    'title': '',
    'description': ''
  }

  saveCategory() {
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

    this.categoryService.addCategory(this.category).subscribe(
      (data: any) => {
        this.close();
      },
      (error: any) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
        this.close();
      }
    )
  }

  close(): void {
    this.dialogRef.close();
  }
}
