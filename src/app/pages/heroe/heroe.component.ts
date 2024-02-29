import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this.heroesService.getHeroeById(id!)
          .subscribe((resp: any) => {
            this.heroe = resp;
            this.heroe.id = id!;
      });
    }

  }

  guardar(form: NgForm){
    let peticion: Observable<any>;
    if(form.invalid){
      console.log('Formulario no valido.')
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    if (this.heroe.id){
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    }else{
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
      this._router.navigate(['/heroes']);
    });

  }

}
