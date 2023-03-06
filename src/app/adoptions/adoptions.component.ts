import { Component, OnInit } from '@angular/core';
import { Adoption, AdoptionList } from '../model/adoption';
import { AdoptionService } from '../services/adoption.service';

@Component({
  selector: 'app-adoptions',
  templateUrl: './adoptions.component.html',
  styleUrls: ['./adoptions.component.css']
})
export class AdoptionsComponent implements OnInit {
  adoptions: AdoptionList = new AdoptionList();

  constructor(private service: AdoptionService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe({
      next: (adoptions: AdoptionList) => {
        this.adoptions = adoptions
      },
      error: (err) => console.log(err)

    })
  }

  approveAdoption(id: number) {
    this.service.deleteOne(id).subscribe({
      next: (adoption: Adoption) => {
        this.getAll()
      },
      error: (err) => console.log(err)
    })
  }

}
