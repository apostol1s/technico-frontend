import { Component, inject } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { Owner } from '../../interfaces/owner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-read-owner',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatSnackBarModule],
  templateUrl: './read-owner.component.html',
  styleUrl: './read-owner.component.css'
})
export class ReadOwnerComponent {

  ownerService = inject(OwnerService);
  snackBar = inject(MatSnackBar);

  owners:Owner[] = [];
  pageSize = 5;
  currentPage = 1;  

  ngOnInit() {
    this.readOwners();
  }

  readOwners() {
    this.ownerService.getOwners().subscribe({
      next: (response) => {
        this.owners = response;
      },
      error: (err) => {
        console.error('Error fetching owners data', err);
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.readOwners();
  }

  getDisplayedOwners() {
    const sortedOwners = this.owners;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return sortedOwners.slice(startIndex, endIndex);  
  }

  get totalPages()  {
    return Math.ceil(this.owners.length / this.pageSize);
  }

  get pages() {
    const pageCount = this.totalPages;
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }  

  deleteOwners(owner:Owner) {
    this.ownerService.deleteOwner(owner.id).subscribe({
      next: () => {
        this.readOwners();
        this.snackBar.open('Expense Deleted', 'Close', {
          duration: 3000,
          panelClass: ['custom-snackbar'],          
        });
        console.log('Expense deleteded successfully', owner);        
      },
      error: (error) => {
        this.snackBar.open('There is an error', 'Close', {
          duration: 3000,
          panelClass: ['custom-snackbar']
        });
        console.error('Error deleting expense', error);
      }
    });
  }
}