import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdoptionsComponent } from './adoptions/adoptions.component';
import { HomeComponent } from './core/home/home.component';
import { PetPageComponent } from './pets/pet-page/pet-page.component';
import { PetsComponent } from './pets/pets.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "pets", component: PetsComponent },
  { path: "pets/:id", component: PetPageComponent },
  { path: "adoptions", component: AdoptionsComponent },
  { path: "", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
