import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { IUsuario } from '../../../model/IUsuario';
@Component({
  selector: 'app-home-sistema',
  templateUrl: './home-sistema.component.html',
  styleUrl: './home-sistema.component.scss'
})
export class HomeSistemaComponent implements OnInit {

  @ViewChild("rendimento", { static: true }) rendimento!: ElementRef;
  @ViewChild("ingresso", { static: true }) ingresso!: ElementRef;
  @ViewChild("genero", { static: true }) genero!: ElementRef;

  filtro: boolean = false;
  userLogged: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  }
  userLoggedId: string = '';

  private service: UsuarioService = inject(UsuarioService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(){
    const idUser: string = this.route.snapshot.queryParams['userLogged'];
    if (idUser) {
      this.userLogged.id = idUser;
      this.service.findById(idUser).subscribe((usuario)=>{this.userLogged = usuario});
    }
    this.generateChartRendimento();
    this.generateChartIngresso();
    this.generateChartGeneros();
  }

  toggleFiltro(): void {
    this.filtro = !this.filtro;
  }

  private generateChartRendimento(): void{ 
    new Chart(this.rendimento.nativeElement,{
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto', 'Setembro','Outubro','Novembro','Dezembro'],
        datasets: [
          {
            label: 'Gastos',
            data: [100, 399, 800, 2000, 900, 200, 900, 2000, 1000, 540, 300, 1200],
            backgroundColor: '#729FDC',
          },
          {
            label: 'Lucros',
            data: [500, 2000, 1000, 4000, 8000, 1000, 870, 1560, 1430, 540, 1200, 1900],
            backgroundColor: '#1A1424'
          }
        ]
      },
      options: {
        color: '#000',
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              color: '#fff',
              font: {
                size: 16,
                weight: 400
              }
            },
            ticks:{
              color: '#fff',
              font: {
                size: 16,
                weight: 400
              }
            }
          },
          x: {
            beginAtZero: true,
            ticks:{
              color: '#fff',
              font: {
                size: 16,
                weight: 400
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff',
              font: {
                size: 16,
                weight: 400
              }
            }
          }
        }
      },
    });
  }

  private generateChartIngresso(){
    new Chart(this.ingresso.nativeElement,{
      type: 'bar',
      data: {
        labels:  ['Ingressos'],
        datasets: [
          {
            label: 'Inteira',
            data: [10000],
            backgroundColor: '#5b9c11',
          },
          {
            label: 'Meia Crianca',
            backgroundColor: '#bf450d',
            data: [3400],
          },
          {
            label: 'Meia Idoso',
            backgroundColor: '#c4b20e',
            data: [1200],
          },
          {
            label: 'Meia Deficiente',
            backgroundColor: '#c40e0e',
            data: [1000],
          },
          {
            label: 'Meia Estudante',
            backgroundColor: '#0d3dbf',
            data: [8500],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks:{
              color: '#fff',
              font: {
                size: 16,
                weight: 400
              }
            }
          },
          x: {
            beginAtZero: true,
            ticks:{
              color: '#fff',
              font: {
                size: 16,
                weight: 400
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff',
              font: {
                size: 18,
                weight: 400
              }
            }
          },
          subtitle: {
            color: '#000'
          }
        }
      }
    });
  }

  private generateChartGeneros(){
    new Chart(this.genero.nativeElement,{
      type: 'pie',
      data: {
        labels: ['Terror', 'Suspense', 'Drama', 'Comedia', 'Ficcao', 'Romance'],
        datasets: [
          {
            label: 'Generos',
            borderRadius: 8,
            data: [100, 399, 800, 2000, 900,400],
            backgroundColor: [
              '#0d3dbf',
              '#ad0c0c',
              '#ad320c',
              '#ab8b0c',
              '#0e7b87',
              '#ad2f7f'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        borderColor: 'transparent',
        plugins: {
          legend: {
            labels: {
              color: '#fff',
              font: {
                size: 18,
                weight: 500
              }
            }
          }
        }
      },
    });
  }
}

