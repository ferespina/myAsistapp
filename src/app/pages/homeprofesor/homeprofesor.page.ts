import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-homeprofesor',
  templateUrl: './homeprofesor.page.html',
  styleUrls: ['./homeprofesor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomeprofesorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
