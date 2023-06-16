import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  gender: string[] = [
    'Male',
    'Female',
    'Others'
  ]
   empForm: FormGroup;

   constructor(
    private _fb: FormBuilder, 
    private _userService: UserService, 
    private _dialogRef: MatDialogRef<EmpAddEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService: CoreService
   ) {
      this.empForm = this._fb.group({
      fullname: '',
      email: '',
      gender: '',
      status: ''

    });
   }
   ngOnInit(): void {
    this.empForm.patchValue(this.data);
   }
   onFormSubmit() {
    if(this.empForm.valid) {
      if(this.data) {
        this._userService.updateUser(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert('');
            this._coreService.openSnackBar('User Details Updated Successfully')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      } else {
        this._userService.addUser(this.empForm.value).subscribe({
          next: (val: any) => {
            
            this._coreService.openSnackBar('User Added Successfully')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      }
      
      
    }
   }
}
