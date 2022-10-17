import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "../shared/api.service";
import { EmployeModel } from "./employe.model";
@Component({
  selector: "app-employe",
  templateUrl: "./employe.component.html",
  styleUrls: ["./employe.component.scss"],
})
export class EmployeComponent implements OnInit {
  formValue!: FormGroup;

  employeModelobj : EmployeModel = new EmployeModel();

  employeedata!:any;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname: [" "],
      lastname: [""],
      emailid: [""],
      mobilenumber: [""],
      salary: [""],
    });

    this.getallEmployee()
  }
  postemployeeDetails(){
    this.employeModelobj.Firstname = this.formValue.value.firstname;
    this.employeModelobj.Lastname = this.formValue.value.lastname;
    this.employeModelobj.Email = this.formValue.value.emailid;
    this.employeModelobj.Mobile = this.formValue.value.mobilenumber;
    this.employeModelobj.Salary = this.formValue.value.salary;

    this.api.postemploye(this.employeModelobj).subscribe((response) => {
      console.log(response);
      
      alert("employee added");

      this.formValue.reset();

      this.getallEmployee()
    });
  }

  getallEmployee(){
  this.api.getEmploye().subscribe(res=>{
    this.employeedata=res
    console.log(res)
  })
  }

  deleteEmployee(id:any){
    this.api.Deletemployedata(id).subscribe(res=>{
      alert("deleted successfully");
      this.getallEmployee();
    })
  }


  onEdit(row:any){
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['emailid'].setValue(row.emailid);
    this.formValue.controls['mobilenumber'].setValue(row.mobilenumber);
    this.formValue.controls['salary'].setValue(row.salary);

    // this.api.upadateEmploye(data,id).subscribe((res)=>{
    //  console.log(res)
    // })
    
  alert("success")
  }
}
