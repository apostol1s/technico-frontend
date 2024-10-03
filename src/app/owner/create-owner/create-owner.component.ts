import { Component, inject } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Owner } from '../../interfaces/owner';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-owner',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './create-owner.component.html',
  styleUrl: './create-owner.component.css'
})
export class CreateOwnerComponent {
  ownerService = inject(OwnerService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  
  form = new FormGroup(
    {
      vat: new FormControl('', [
        Validators.required, 
        Validators.minLength(9),
        Validators.maxLength(9)]),
      name: new FormControl('', [
        Validators.required]),
      surname: new FormControl('', [
        Validators.required]),
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
    }
  );

  createOwner(value: any) {
    const owner = {
      vat: this.form.value.vat,
      name: this.form.value.name,
      surname: this.form.value.surname,
      address: this.form.value.address,
      phoneNumber: this.form.value.phoneNumber,
      email: this.form.value.email,
      password: this.form.value.password,
    } as Owner;

    this.ownerService.createOwner(owner).subscribe({
      next: () => {
        this.form.reset();
        this.snackBar.open('Owner Created', 'Close', {duration: 3000});
        console.log('Owner created', owner);
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
