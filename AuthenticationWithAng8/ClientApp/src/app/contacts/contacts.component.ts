import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../api-authorization/service.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  title = 'ContactsFrontEnd';

  constructor(private ServiceService: ServiceService) { }
  data: any[];
  EmpForm: FormGroup;
  submitted = false;
  EventValue: any = "Save";
  Name:string;

  ngOnInit(): void {
    this.getdata();

    this.EmpForm = new FormGroup({
      userId:new FormControl(null),
      contactID: new FormControl(null),
      contactName: new FormControl("",[Validators.required]),
      //empContact: new FormControl("",[Validators.required]),
      // empEmail:new FormControl("",[Validators.required]),
      address: new FormControl("",[Validators.required]),
    })
  }
  getdata() {
    console.log("Inside GetData");

    this.ServiceService.getData().subscribe((data: any[]) => {
      this.EmpForm.patchValue

      this.data = data;

      // console.log(this.data);
      // this.Name=this.data[0].contactName;
      // console.log(this.Name);
    })
    console.log("retrieving Data");
    console.log(this.data);
  }
  deleteData(id) {
    console.log(id);
    this.ServiceService.deleteData(id).subscribe((data: any[]) => {
      this.EmpForm.patchValue
      this.data = data;
      this.getdata();
    })
  }
  Save() {
    console.log("Inside Save");
    console.log(this.data);
    this.submitted = true;

     if (this.EmpForm.invalid) {
            return;
     }
    this.ServiceService.postData(this.EmpForm.value).subscribe((data: any[]) => {
      this.EmpForm.patchValue
      this.data = data;
      this.resetFrom();

    })
  }
  Update() {
    console.log("Inside Update");
    this.submitted = true;
    console.log(this.EmpForm);
    console.log(this.EmpForm.value);
    if (this.EmpForm.invalid) {
      console.log("Inside invalid");
     return;
    }
    this.ServiceService.putData(this.EmpForm.value.contactID,this.EmpForm.value).subscribe((data: any[]) => {
      this.EmpForm.patchValue
      this.data = data;
      this.resetFrom();
    })
  }

  EditData(Data) {
    console.log(Data)
    // this.EmpForm.controls["UserId"].setValue(Data.UserId);
    this.EmpForm.controls["contactID"].setValue(Data.contactID);
    this.EmpForm.controls["contactName"].setValue(Data.contactName);
    this.EmpForm.controls["address"].setValue(Data.address);
    this.EventValue = "Update";
  }

  resetFrom()
  {
    this.getdata();
    this.EmpForm.reset();
    this.EventValue = "Save";
    this.submitted = false;
  }
}

