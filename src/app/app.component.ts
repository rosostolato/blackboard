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

  isXS() {
    return screen.width < 500;
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
    const str = `periodo;codigo;nome;ch;req
    1;CES.321;Álgebra Linear e Geometria Analítica I;80;
    1;CES.325;Algoritmos e Técnicas de Programação;80;
    1;CES.001;Cálculo I;120;
    1;CES.323;Informática;60;
    1;CES.324;Introdução à Engenharia de Controle e Automação;40;
    1;CES.319;Química;60;
    1;CES.320;Química Experimental;40;
    2;CES.418;Álgebra Linear e Geometria Analítica II;80; CES.321
    2;CES.094;Cálculo II;80; CES.001
    2;CES.086;Física Experimental I;40;
    2;CES.179;Física I;80; CES.001, CES.321
    2;CES.326;Introdução a Ciências dos Materiais;60; CES.319
    2;CES.327;Probabilidade e Estatística;60; CES.001
    2;CES.258;Programação de Computadores;80; CES.325
    3;CES.191;Cálculo III;80; CES.094
    3;CES.197;Cálculo Numérico;80; CES.325
    3;CES.329;Desenho Técnico para Engenharia;80;
    3;CES.328;Equações Diferenciais;80; CES.001, CES.418
    3;CES.195;Estrutura de Dados;80; CES.258
    3;CES.184;Física Experimental II;40;
    3;CES.183;Física II;80; CES.094, CES.179
    4;CES.200;Cálculo IV;80; CES.191
    4;CES.331;Ciências do Ambiente;40;
    4;CES.215;Fenômenos de Transporte;80; CES.001, CES.183
    4;CES.193;Física Experimental III;40;
    4;CES.192;Física III;80; CES.183, CES.191
    4;CES.211;Instrumentação Industrial;80;
    4;CES.333;Laboratório de Técnicas e Sistemas Digitais;40;
    4;CES.330;Mecânica/estática;60; CES.179, CES.321
    4;CES.332;Técnicas e Sistemas Digitais;60;
    5;CES.336;Arquitetura e Fundamentos de Computadores;60; CES.332
    5;CES.207;Circuitos Elétricos I;80; CES.192
    5;CES.340;Eletrônica I;60;
    5;CES.338;Equipamentos e Processos Industriais;80; CES.211
    5;CES.202;Física IV;80; CES.192
    5;CES.339;Laboratório de Eletrônica I;40;
    5;CES.335;Mecânica dos Sólidos;80; CES.330
    5;CES.337;Modelagem de Sistemas Dinâmicos;80; CES.200, CES.418
    5;CES.334;Termodinâmica;60; CES.183
    6;CES.210;Circuitos Elétricos II;80; CES.200, CES.207
    6;CES.347;Comunicação de Dados;60; CES.258, CES.336
    6;CES.345;Controle Clássico;80; CES.337
    6;CES.341;Eletricidade Aplicada;60; CES.192
    6;CES.342;Eletrônica II;60; CES.340
    6;CES.343;Laboratório de Eletrônica II;40;
    6;CES.344;Microprocessadores e Microcontroladores;80; CES.336
    6;CES.222;Sistemas de Transdução;60;
    7;CES.351;Controladores Lógicos Programáveis;60; CES.222, CES.325, CES.338
    7;CES.348;Controle Moderno;80; CES.345
    7;CES.214;Eletricidade Industrial;80; CES.341
    7;CES.250;Expressão Oral e Escrita;40;
    7;CES.352;Laboratório de Controladores Lógicos Programáveis;40;
    7;CES.349;Processamento de Sinais;80; CES.337
    7;CES.350;Robótica Industrial;80; CES.325, CES.335
    7;CES.227;Sistemas Pneumáticos para Automação;80; CES.215
    8;CES.228;Controle Digital;80; CES.345, CES.348
    8;CES.353;Economia;40;
    8;CES.356;Elementos Finais de Controle;60; CES.211
    8;CES.358;Laboratório de Controle I;80; CES.345, CES.349
    8;CES.354;Metodologia Científica e Tecnológica;40; CES.250
    8;CES.357;Protocolo de Redes Industriais;80; CES.347
    8;CES.355;Sistemas Hidráulicos para Automação;80; CES.227
    8;CES.233;Sistemas Supervisórios de Processos Industriais;80; CES.351
    9;CES.360;Direito do Trabalho;60;
    9;CES.362;Laboratório de Controle II;80; CES.228, CES.358
    9;CES.363;Projeto Final de Curso I;40;
    9;CES.361;Segurança e Higiene no Trabalho;60;
    9;CES.359;Teoria Geral da Administração;60;
    10;CES.229;Controle Avançado;80; CES.348
    10;CES.365;Gerência de Projetos;40;
    10;CES.364;Gestão Ambiental;60;
    10;CES.242;Programação Econômica e Financeira;80;
    10;CES.366;Projeto Final de Curso II;40;
    11;CES.368;Controle de Máquinas Elétricas;80; CES.228
    11;CES.161;Elementos Finitos;80; CES.197
    11;CES.254;Geoprocessamento;80;
    11;CES.164;Hidráulica Avançada;80;
    11;CES.370;Instalações de Equipamentos Elétricos em Atmosfera Explosiva;60;
    11;CES.163;Inteligência Artificial;80;
    11;CES.252;Interligações Submarinas;80;
    11;CES.162;Introdução à Economia do Petróleo;80;
    11;CES.256;Libras;40;
    11;CES.165;Processos Químicos e Petroquímicos;80;
    11;CES.166;Programação Orientada a Eventos;80;
    11;CES.367;Sistemas Automáticos de Árvore de Natal;80;
    11;CES.251;Tópicos Especiais em Desenho Técnico Avançado;40;
    11;CES.253;Valoração Econômica Ambiental;40;`;

    this.papa.parse(str, {
      header: true,
      delimiter: ';',
      encoding: 'ISO-8859-1',
      complete: this.onLoad.bind(this)
    });
  }
}
