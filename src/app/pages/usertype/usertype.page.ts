import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.page.html',
  styleUrls: ['./usertype.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UsertypePage {

  constructor(private router: Router) { }
  
  irALogin(tipoUsuario: string) {
    if (tipoUsuario === 'profesor') {
      this.router.navigate(['/loginprofesor']);
    } else if (tipoUsuario === 'alumno') {
      this.router.navigate(['/login']);
    }
  }
}