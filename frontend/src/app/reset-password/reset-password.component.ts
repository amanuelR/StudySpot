import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  signup!: FormGroup;
  errorMessage: string = '';
  
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService, private snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.signup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]]
      // password: ['', Validators.required],
      // confirmPassword: ['', Validators.required],
    });
  }
  
  onSubmit(): void {
    const { email, password, confirmPassword } = this.signup.value;

      // Check if passwords match
      if (password !== confirmPassword) {
        this.snackBar.open('Passwords do not match', 'Close', {
          duration: 3000,
        });
        return; // Stop form submission if passwords don't match
      }

    // Check if the provided username and email are already taken

        this.userService.checkEmail(email).subscribe((emailResponse: any) => {
          if (emailResponse.taken) {
            this.snackBar.open('Email is already taken', 'Close', { duration: 3000 });
          } else {
            // No username or email conflict, proceed with the signup
            this.http.post('http://127.0.0.1:5000/api/signup', { email, password })
              .subscribe(
                (response) => {
                  this.router.navigate(['/signup']);
                },
                (error) => {
                  if (error.status === 409) {
                    this.errorMessage = 'User Already Exists';
                  } else {
                    this.errorMessage = 'An unknown error occurred';
                  }
                }
              );
          }
        });
      }
    }