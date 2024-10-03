import { Component, OnInit, inject } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Owner } from '../../interfaces/owner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-owner',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './update-owner.component.html',
  styleUrl: './update-owner.component.css'
})
export class UpdateOwnerComponent {
  ownerService = inject(OwnerService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute); 

  id = this.route.snapshot.params['id'];

  form = new FormGroup({
    address: new FormControl('', [
      Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(14),
      Validators.pattern('^[0-9]*$') ]),      
    email: new FormControl('', [
      Validators.required, 
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$')]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ])
  }); 

  updateOwner(value: any) {
    const owner = {
      address: this.form.value.address,
      phoneNumber: this.form.value.phoneNumber,
      email: this.form.value.email,
      password: this.form.value.password,
    } as Owner;

    this.ownerService.updateOwner(this.id, owner).subscribe({
      next: () => {
        this.form.reset();
        this.snackBar.open('Owner Updated', 'Close', {duration: 3000});
        console.log('Owner Updated', owner);
      },
      error: (error) => {
        this.snackBar.open('There is an error', 'Close', {duration: 3000});
        console.error('There was an error!', error);
      },
    });
  }

  onClose() {
    this.form.reset();
    this.router.navigate(['read-owner']);
  }
}
