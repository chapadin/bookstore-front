import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css'],
})
export class LivroDeleteComponent implements OnInit {
  id_cat: String = '';

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: '',
  };

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(
      (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Livro criado com sucesso!');
      },
      (erro) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Erro ao criar novo livro!');
      }
    );
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  delete(): void {
    this.service.delete(this.livro.id!).subscribe(
      () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Livro deletado com sucesso!');
      },
      (erro) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Falha so deletar livro!');
      }
    );
  }

  findById() {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta;
    });
  }
}