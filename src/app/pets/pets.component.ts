import { Component, OnInit } from '@angular/core';
import { PetList } from '../model/pet.model';
import { PetService } from '../services/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: PetList = new PetList();

  params = {
    filter: {
      category: "",
      sex: ""
    },
    sort: ""
  }

  constructor(private service: PetService) { }

  ngOnInit(): void {
    this.getPets();
  }


  
  getPets() {
    this.service.getAll(this.params).subscribe({
      next: (pets: PetList) => {
        this.pets = pets;
      },
      error: (err) => console.log(err)
    })
  }
}
