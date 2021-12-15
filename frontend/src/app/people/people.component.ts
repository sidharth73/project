import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { People } from '../people.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  pepForm: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  peoples: People[];

  constructor(private fb: FormBuilder, private pepService: PeopleService) { }

  ngOnInit(): void {
    this.getPeoples();
    this.pepForm = this.fb.group({
      _id: [''],
      name: ['Ex. Sidharth Bisht', Validators.required],
      age: ['Ex 22', Validators.required],
      gender: ['Ex Male'],
      mobile: []
    })
  }

  getPeoples(){
    this.pepService.getPeopleList().subscribe((res: People[]) => {
      console.log(res);
      this.peoples = res;
    })
  }

  onDeletePeople(id){
    if(confirm('Do you want to delete this employee?')){
      this.pepService.deletePeople(id).subscribe(
        (res) => {
          console.log(res);
          this.getPeoples();
        },
        err => {
          console.log(err);
        })
    }
  }

  onEditPeople(pep:People){
    this.editMode = true;
    this.showModal = true;
    this.pepForm.patchValue(pep);
  }

  onPepSubmit(){
    if (this.pepForm.valid) {
      if(this.editMode){
        this.pepService.updatePeople(this.pepForm.value).subscribe(
          res => {
            console.log(res);
            this.getPeoples();
            this.onCloseModal();
          },err => console.log(err));  
      }else{
        this.pepService.addPeople(this.pepForm.value).subscribe(
          res => {
            console.log(res);
            this.getPeoples();
            this.onCloseModal();
          },
          err => {
            console.log(err);  
          }
        ) 
      }
    }
  }

  onAddPeople(){
    this.showModal = true;
  }

  onCloseModal(){
    this.showModal = false;
  }

}
