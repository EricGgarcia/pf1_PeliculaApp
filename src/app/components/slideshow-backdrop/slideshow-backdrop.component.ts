import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { register } from 'swiper/element/bundle';
import { DetalleComponent } from '../detalle/detalle.component';
register();

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
  standalone: false
})
export class SlideshowBackdropComponent  implements OnInit {

  @Input() peliculas: Pelicula[]= [];

  constructor(private modalctrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: number){
    const modal= await this.modalctrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });

    modal.present();
  }

}
