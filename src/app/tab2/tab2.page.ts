import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  textoBuscar= '';
  buscando= false;
  peliculas: Pelicula[]= [];
  ideas: string[]= ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella', 'Thor'];

  constructor(
    private moviesService:MoviesService,
    private modalctrl:ModalController
  ) {}

  buscar(event: any){
    const valor: string= event.detail.value;

    if(valor.length=== 0){
      this.buscando= false;
      this.peliculas= [];
      return;
    }

    this.buscando= true;
    this.moviesService.buscarPeliculas(valor).subscribe(resp=>{
      this.peliculas= resp['results'];
      this.buscando= false;
    });
  }

  async detalle(id: number){
    const modal= await this.modalctrl.create({
          component: DetalleComponent,
          componentProps:{
            id
          }
        });

        modal.present();
  }

}
