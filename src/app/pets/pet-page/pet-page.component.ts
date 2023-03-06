import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Adoption } from 'src/app/model/adoption';
import { Pet } from 'src/app/model/pet.model';
import { AdoptionService } from 'src/app/services/adoption.service';
import { PetService } from 'src/app/services/pet.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.css']
})
export class PetPageComponent implements OnInit {
  petId: number = NaN;
  pet: Pet = new Pet();

  adoptionForm = new FormGroup({
    name: new FormControl("", Validators.required),
    contact: new FormControl("", Validators.required)
  })

  constructor(
    private route: ActivatedRoute, 
    private service: PetService, 
    private aService: AdoptionService, 
    public toast: ToastService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.petId = params['id']
      this.getPet();
    })
  }

  getPet() {
    this.service.getOne(this.petId).subscribe({
      next: (pet: Pet) => {
        this.pet = pet;
      },
      error: (err) => console.log(err)
    })
  }

  submitAdoption() {
    if (!this.adoptionForm.valid) {
      this.toast.show("Please fill in the form", { classname: 'bg-danger text-light', delay: 5000 })
      return;
    }
    let adoption = new Adoption(this.adoptionForm.value)
    adoption.petId = this.petId;
    adoption.petName = this.pet.name;
    this.aService.postAdoption(adoption).subscribe({
      next: (adoption: Adoption) => {
        this.toast.show("Request sent", { classname: 'bg-success text-light', delay: 5000 })
        this.adoptionForm.reset();
      },
      error: (err) => {
        this.toast.show("Error", { classname: 'bg-danger text-light', delay: 10000 })
      }
    })
  }

}
