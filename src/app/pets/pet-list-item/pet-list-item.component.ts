import { Component, Input, OnInit } from '@angular/core';
import { Pet, PetList } from 'src/app/model/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-list-item',
  templateUrl: './pet-list-item.component.html',
  styleUrls: ['./pet-list-item.component.css']
})
export class PetListItemComponent implements OnInit {
  @Input() pet: Pet = new Pet();

  constructor() { }

  ngOnInit(): void {
  }

  changeRoute() {
    
  }


}
