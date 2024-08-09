import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, Colors } from 'chart.js/auto';
import { color, EChartsOption } from 'echarts';
@Component({
  selector: 'app-home-sistema',
  templateUrl: './home-sistema.component.html',
  styleUrl: './home-sistema.component.scss'
})
export class HomeSistemaComponent implements OnInit {

  @ViewChild("rendimento", { static: true }) rendimento!: ElementRef;
  @ViewChild("ingresso", { static: true }) ingresso!: ElementRef;
  @ViewChild("genero", { static: true }) genero!: ElementRef;


  ngOnInit(){
    this.generateChartRendimento();
    this.generateChartIngresso();
    this.generateChartGeneros();
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
        color: '#FFF',
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              color: '#FFF'
            }
          },
          x: {
            beginAtZero: true,
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#FFF',
            }
          },
          subtitle: {
            color: '#FFF'
          },
          tooltip: {
            titleColor: '#FFF'
          },
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
            data: [100],
            backgroundColor: '#3104fb',
          },
          {
            label: 'Meia Crianca',
            backgroundColor: '#ffa930',
            data: [400],
          },
          {
            label: 'Meia Idoso',
            backgroundColor: '#1a1424',
            data: [800],
          },
          {
            label: 'Meia Deficiente',
            backgroundColor: '#55a762',
            data: [2000],
          },
          {
            label: 'Meia Estudante',
            backgroundColor: '#7e2323',
            data: [900],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#FFF'
            }
          },
          subtitle: {
            color: '#FFF'
          }
        }
      }
    });
  }
  private generateChartGeneros(){
    new Chart(this.genero.nativeElement,{
      type: 'pie',
      data: {
        labels: ['Acão', 'Aventura', 'Drama', 'Comedia', 'Ficcao','Terror'],
        datasets: [
          {
            label: 'Generos',
            data: [100, 399, 800, 2000, 900,400]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,

        plugins: {
          legend: {
            labels: {
              color: '#FFF'
            }
          },
          subtitle: {
            color: '#FFF'
          }
        }
      },
    });
  }
}

