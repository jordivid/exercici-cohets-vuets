import { Component, Vue } from "vue-property-decorator";
import Cohet from "../models/cohet";
import { Competicio } from "../models/competicio";

@Component
export default class Cursa extends Vue {
  static SEPARACIO = 100;

  altura: number = window.innerHeight;
  ample: number = window.innerWidth - 100;
  carrils: number = Math.round((this.altura - 50) / Cursa.SEPARACIO) - 1;
  competicio: Competicio | null = null;
  cohets: Cohet[] = [];
  raceArea: HTMLElement | null = null;
  numCohets = 0;
  timer: any;
  
  mounted(): void {
    const btAccelerar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btAccelerar")
    );
    const btFrenar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btFrenar")
    );
    const btAturar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btAturar")
    );

    this.cohets = this.getCohets;
    this.raceArea = <HTMLElement>document.getElementById("raceArea");
    this.setup();

    btAccelerar.setAttribute("disabled", "true");
    btFrenar.setAttribute("disabled", "true");
    btAturar.setAttribute("disabled", "true");
  }

  // Retorna cohets del store
  get getCohets(): Cohet[] {
    const rockets = this.$store.getters.getCohets.values();
    const cohets: Cohet[] = [];

    for (const rocket of rockets) {
      cohets.push(rocket);
    }

    return cohets;
  }

  // Es posiciona els cohets per la cursa.
  setup(): void {
    this.numCohets = this.cohets.length;

    // Si hi ha més cohets dels que caben a la pantalla, els elimino de la competició.
    if (this.carrils > this.numCohets) {
      this.carrils = this.numCohets;
    } else if (this.numCohets > this.carrils) {
      const diferencia = this.numCohets - this.carrils;
      this.numCohets -= diferencia;
      this.cohets.splice(this.numCohets, diferencia);
    }

    // En estar els cohets renderitzats amb un v-for vinculat a l'array de cohets, s'ha de donar una mica de temps a Vue per que els inclogui en el DOM.
    setTimeout(() => {
      let cohet: HTMLElement;

      for (let i = 0; i < this.cohets.length; i++) {
        this.cohets[i].posY = 0;
        this.cohets[i].posX = 50 + i * Cursa.SEPARACIO;
        cohet = <HTMLElement>document.getElementById(this.cohets[i].codi);
        cohet.style.top = `${this.cohets[i].posX}px`;
        cohet.style.left = `${this.cohets[i].posY}px`;
      }
    }, 50);
   
  }

  // Retorna imatge d'un cohet
  get cohetImage() {
    return function(nom: string) {
      return require('./../assets/' + nom);
    }
  }

  // Engega la cursa. Tots els cohets comencen amb una potencia inicial de 10.
  iniciCursa(): void {
    const codisCohets: string[] = [];
    const btAccelerar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btAccelerar")
    );
    const btFrenar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btFrenar")
    );
    const btIniciar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btIniciar")
    );
    const btAturar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btAturar")
    );

    btAccelerar.removeAttribute("disabled");
    btFrenar.removeAttribute("disabled");
    btAturar.removeAttribute("disabled");
    btIniciar.setAttribute("disabled", "true");

    for (let i = 0; i < this.cohets.length; i++) {
      this.cohets[i].accelerar();
      codisCohets.push(this.cohets[i].codi);
    }
    this.competicio = new Competicio(codisCohets);

    // A intèrvals regulars s'actualitzarà la posició dels cohets.
    this.timer = setInterval(() => {
      this.aCorrer();
    }, 50);
  }

  // S'atura la cursa. Els cohets tornen a la sortida.
  aturarCursa(): void {
    let cohet: HTMLElement;

    const btAccelerar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btAccelerar")
    );
    const btFrenar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btFrenar")
    );
    const btIniciar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btIniciar")
    );
    const btAturar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btAturar")
    );

    clearInterval(this.timer);
    this.competicio = null;

    btAccelerar.setAttribute("disabled", "true");
    btFrenar.setAttribute("disabled", "true");
    btAturar.setAttribute("disabled", "true");
    btIniciar.removeAttribute("disabled");

    for (let i = 0; i < this.cohets.length; i++) {
      this.cohets[i].aturar();
      this.cohets[i].posY = 0;
      this.cohets[i].posX = 20 + i * Cursa.SEPARACIO;
      cohet = <HTMLElement>document.getElementById(this.cohets[i].codi);
      cohet.style.left = `${this.cohets[i].posY}px`;
    }
  }

  // Es recalcula la posició del cohets segons la potència i es reposicionen a l'àrea de cursa.
// Si un cohet ha finalitzat la cursa, s'atura a la posició inicial a l'espera que els altres
// finalitzin.
  aCorrer(): void {
    let cohet: HTMLElement;
    let classificat: boolean;

    if (this.competicio != null) {
      for (let i = 0; i < this.cohets.length; i++) {
        if (this.competicio.getVoltes(this.cohets[i].codi) < this.competicio.voltes) {
          this.cohets[i].posY += Math.round(this.cohets[i].curpower / 5);
          // El cohet ha acabat una volta.
          if (this.cohets[i].posY > this.ample) {
              classificat = this.competicio.classificar(this.cohets[i]);
              // El cohet ha finalitzat la cursa
              if (classificat) {
                this.cohets[i].posY = 0;
              } else {
                this.cohets[i].posY = -100;
              }
          }
        }
      }
    }

    for (let i = 0; i < this.cohets.length; i++) {
      cohet = <HTMLElement>document.getElementById(this.cohets[i].codi);
      cohet.style.left = `${this.cohets[i].posY}px`;
    }

    if (this.competicio != null) {
      if (this.competicio.finalCompeticio()) {
        this.aturarCursa();
        this.$router.push("/classificacio"); 
      }
    }
  }

  tornar(): void {
    const btIniciar: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("btIniciar")
    );
  
    if (btIniciar.disabled === true) {
      this.aturarCursa();
    }
    this.$router.push("/"); 
  }

  // Acceleració del cohet seleccionat.
  accelerar(): void {
    const codi: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("codi")
    );
    const cohet: Cohet | null = Cohet.getCohet(codi.value, this.cohets);

    if (cohet != null) {
      cohet.accelerar();
    }
  }

  // Frenada del cohet seleccionat.
  frenar(): void {
    const codi: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("codi")
    );
    const cohet: Cohet | null = Cohet.getCohet(codi.value, this.cohets);

    if (cohet != null) {
      if (cohet.curpower > 10) {
        cohet.frenar();
      }
    }
  }

}
