import { Component, OnInit } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page{

  peliculas: PeliculaDetalle[]= [];
  generos: Genre[]= [];
  favoritoGenero: any[]= [];

  constructor(
    private dataLocalService: DataLocalService,
    private moviesService: MoviesService
  ) {}

   async ionViewWillEnter(){
    this.peliculas= await this.dataLocalService.cargarFavoritos();
    this.generos= await this.moviesService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos:Genre[], pelicula:PeliculaDetalle[]){
    this.favoritoGenero= [];
    generos.forEach( genero=>{
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: pelicula.filter( peli=>{
          return peli.genres?.find(genre=> genre.id=== genero.id);
        })
      });
    });
  }

}
