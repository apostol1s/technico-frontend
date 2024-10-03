import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { ReportService } from '../services/report.service';
import { Repair } from '../interfaces/repair';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

  reportService = inject(ReportService);
  snackBar = inject(MatSnackBar);

  report:Repair[] = [];
  pageSize = 5;
  currentPage = 1;

  ngOnInit() {
    this.readReport();
  }

  readReport() {
    this.reportService.getRepairs().subscribe({
      next: (response) => {
        this.report = response;
      },
      error: (err) => {
        console.error('Error fetching report data', err);
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.readReport();
  }

  getDisplayedReport() {
    const sortedReport = this.report;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return sortedReport.slice(startIndex, endIndex);  
  }

  get totalPages()  {
    return Math.ceil(this.report.length / this.pageSize);
  }

  get pages() {
    const pageCount = this.totalPages;
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
}
