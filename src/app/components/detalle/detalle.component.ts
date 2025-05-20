import { Component, Input, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { MoviesService } from '../../services/movies.service';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
register();

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false
})
export class DetalleComponent  implements OnInit {

  @Input() id: any;

  pelicula: PeliculaDetalle= {};
  actores: Cast[]= [];
  ocultar= 150;
  estrella= 'star-outline';

  constructor(
    private moviesService:MoviesService,
    private modalCtrl:ModalController,
    private dataLocalService:DataLocalService
  ) {}

  ngOnInit() {

    this.dataLocalService.existePelicula(this.id)
    .then(existe=> this.estrella=(existe)?'star': 'star-outline');


    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp=>{
      this.pelicula= resp;
    });

    this.moviesService.getActoresPelicula(this.id).subscribe(resp=>{
      this.actores= resp.cast;
    });
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    const existe= this.dataLocalService.guardarPelicula(this.pelicula);
    this.estrella=(existe)?'star': 'star-outline';
  }

}
