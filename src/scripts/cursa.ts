import { Vue } from "vue-property-decorator";
import Cohet from "../models/cohet";
import { Competicio } from "../models/competicio";

export default class Cursa extends Vue {
  separacio = 100;
  altura: number = window.innerHeight;
  ample: number = window.innerWidth - 100;
  carrils: number = Math.round((this.altura - 50) / this.separacio) - 1;
  competicio: Competicio | null = null;
  cohets: Cohet[] = [];
  raceArea: HTMLElement | null = null;
  numCohets = 0;
  // timer: any;
  
  created(): void {
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
    return this.$store.getters.getCohets.values();
  }

  // Es posiciona els cohets per la cursa.
  setup(): void {
    this.numCohets = this.cohets.length;
    // const codi: HTMLInputElement = <HTMLInputElement>(
    //     document.getElementById("codi")
    // );
    // let cohet: HTMLElement;
    // let codiH = "";

    if (this.carrils > this.numCohets) {
      this.carrils = this.numCohets;
    } else if (this.numCohets > this.carrils) {
      const diferencia = this.numCohets - this.carrils;
      this.numCohets -= diferencia;
      this.cohets.splice(this.numCohets, diferencia);
    }

    // for (let i = 0; i < this.carrils; i++) {
    //     codiH = `<option value="${this.cohets[i].codi}">${this.cohets[i].codi}</option>`;
    //     codi.insertAdjacentHTML("beforeend", codiH);

    //     this.cohets[i].posY = 0;
    //     this.cohets[i].posX = 50 + i * this.separacio;
    //     this.raceArea?.insertAdjacentHTML("beforeend", this.cohets[i].codiCohet());
    //     cohet = <HTMLElement>document.getElementById(this.cohets[i].codi);
    //     cohet.style.top = `${this.cohets[i].posX}px`;
    //     cohet.style.left = `${this.cohets[i].posY}px`;
    // }
  }
}
