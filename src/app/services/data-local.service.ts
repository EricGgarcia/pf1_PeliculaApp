import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[]= [];

  constructor(
    private storage: Storage,
    private toastController:ToastController
  ) {
    this.storage.create();
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
    });
    await toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle){
    this.storage.create();
    let existe= false;
    let mensaje= '';

    for (const peli of this.peliculas) {
      if(peli.id=== pelicula.id){
        existe= true;
        break;
      }
    }

    if(existe){
      this.peliculas= this.peliculas.filter( peli=> peli.id!== pelicula.id);
      mensaje= 'Removido De Favoritos';
    }
    else{
      this.peliculas.push(pelicula);
      mensaje= 'Agregada A Favoritos';
    }

    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);

    return !existe;
  }

  async cargarFavoritos(){
    const peliculas= await this.storage.get('peliculas');
    this.peliculas= peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: number){
    await this.cargarFavoritos();
    const existe= this.peliculas.find(peli=> peli.id=== id);
    return (existe)? true: false;
  }

}
