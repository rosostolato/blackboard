import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';

import { MateriaCollection, IMateriaParsed } from './models/materia';
import { PeriodCollection } from './models/period';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  materiaList: MateriaCollection;
  periodList: PeriodCollection;

  constructor (private papa: Papa) {
    this.preLoad();
  }

  public onUpload(fileList: FileList) {
    const file = fileList[0];

    this.papa.parse(file, {
      header: true,
      delimiter: ';',
      encoding: 'ISO-8859-1',
      complete: this.onLoad.bind(this)
    });
  }

  private onLoad(results) {
    const objects: IMateriaParsed[] = results.data;
    this.materiaList = new MateriaCollection(objects);
    this.periodList = new PeriodCollection(this.materiaList.periods);
  }

  /**
   * Temporário:
   * Este preload serve para carregar automaticamente
   * o arquvio de csv com os dados das matérias
   */
  private preLoad() {
    const str = `id;period;name;required
    1;1;Química;
    2;1;Química Experimental;
    3;1;Álgebra Linear e Geom. Analít. I;
    4;1;Cálculo I;
    5;1;Informática;
    6;1;Introdução à Engenharia de Controle e Automação;
    7;1;Algoritmos e Técnicas de Programação;
    8;2;Cálculo II;4
    9;2;Física I;3,4
    10;2;Física Experimental I;
    11;2;Álgebra Linear e Geom. Analit. II;3
    12;2;Introdução a Ciências dos Materiais;1
    13;2;Probabilidade e Estatística;4
    14;2;Programação de Computadores;7
    15;3;Cálculo III;8
    16;3;Física II;8,9
    17;3;Física Experimental II;
    18;3;Equações Diferenciais;4,11
    19;3;Desenho Técnico para a Engenharia;
    20;3;Cálculo Numérico;7
    21;3;Estrutura de Dados;14
    22;4;Cálculo IV;15
    23;4;Mecânica/Estática;3,9
    24;4;Física III;15,16
    25;4;Física Experimental III;
    26;4;Fenômenos de Transporte;4, 8
    27;4;Ciências do Ambiente;
    28;4;Instrumentação Industrial;
    29;4;Técnicas e Sistemas Digitais;
    30;4;Laboratório de Técnicas e Sistemas Digitais;
    31;5;Física IV;24
    32;5;Termodinâmica;16
    33;5;Mecânica dos Sólidos;23
    34;5;Circuitos Elétricos I;24
    35;5;Arquitetura e Fundamentos de Computadores;29
    36;5;Modelagem de Sistemas Dinâmicos;11,22
    37;5;Equipamentos e Processos Ind.;28
    38;5;Laboratório de Eletrônica I;34
    39;5;Eletrônica I;34
    40;6;Eletricidade Aplicada;24
    41;6;Eletrônica II;34
    42;6;Laboratório de Eletrônica II;
    43;6;Circuitos Elétricos II;22,34
    44;6;Microprocessadores e Microcontroladores;35
    45;6;Controle Clássico;36
    46;6;Sistemas de Transdução;
    47;6;Comunicação de Dados;14,35
    48;7;Expressão Oral e Escrita;
    49;7;Controle Moderno;45
    50;7;Processamento de Sinais;
    51;7;Eletricidade Industrial;43
    52;7;Sistemas Pneumáticos para Automação;26
    53;7;Robótica Ind.;14,33
    54;7;Controladores Lógicos Programáveis;14,37,46
    55;7;Lab. de Controladores Lógicos Programáveis;
    56;8;Economia;
    57;8;Metodologia Científica e Tecnológica;48
    58;8;Sistemas Hidráulico para Automação;52
    59;8;Elementos Finais de Controle;28
    60;8;Protocolos de Redes Industriais;47
    61;8;Lab. de Controle I;45
    62;8;Controle Digital;45
    63;8;Sistemas Supervisórios de Processos Industriais;54
    64;8;Teoria Geral da Administração;
    65;9;Direito do Tabalho;
    66;9;Segurança e Higiene no Trabalho;
    67;9;Lab. de Controle II;61
    68;9;Projeto Final de Curso I;
    69;10;Gestão Ambiental;
    70;10;Gerência de Projetos;
    71;10;Projeto Final de Curso II;
    72;10;Controle Avançado;49
    73;10;Programação Econômica e Financeira;`;

    this.papa.parse(str, {
      header: true,
      delimiter: ';',
      encoding: 'ISO-8859-1',
      complete: this.onLoad.bind(this)
    });
  }
}
