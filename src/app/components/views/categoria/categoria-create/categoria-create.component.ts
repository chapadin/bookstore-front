import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css'],
})
export class CategoriaCreateComponent implements OnInit {
  categoria: Categoria = {
    nome: '',
    descricao: '',
  };

  constructor(private service: CategoriaService, private router: Router) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.categoria).subscribe(
      (resposta) => {
        this.router.navigate(['/categorias']);
        this.service.mensagem('Categoria criada com sucesso!');
      },
      (erro) => {
        for (let i = 0; i < erro.error.errors.length; i++) {
          this.service.mensagem(erro.error.errors[i].message);
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/categorias']);
  }
}
