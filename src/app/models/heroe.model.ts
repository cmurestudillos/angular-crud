export class HeroeModel{
  id!: string;
  nombre!: string;
  poder!: string;
  estado: boolean;

  constructor(){
    this.estado = true;
  }
}
