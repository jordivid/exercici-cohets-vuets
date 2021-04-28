import Cohet from "./cohet";

export class Competicio {
  private _voltes: number;
  private _competidors: Map<string, number>;
  private _classificacio: Cohet[];

  constructor(cohets: string[]) {
    this._voltes = Number(sessionStorage.getItem("voltes_cursa"));
    this._competidors = new Map();
    for (const cohet of cohets) {
      this._competidors.set(cohet, 0);
    }
    this._classificacio = [];
  }

  public finalCompeticio(): boolean {
    if (this._competidors.size === this._classificacio.length) {
      const cohets: Map<string, Cohet> = new Map<string, Cohet>();

      for (const cohet of this.classificacio) {
        cohets.set(cohet.codi, cohet);
      }

      Cohet.serialitzar(cohets, "classificacio_cohets");
      return true;
    } else {
      return false;
    }
  }

  public get voltes(): number {
    return this._voltes;
  }

  public get classificacio(): Cohet[] {
    return this._classificacio;
  }

  // Es retorna el nº de voltes que ha fet un cohet.
  public getVoltes(codi: string): number {
    const voltes: number | undefined = this._competidors.get(codi);

    if (typeof voltes != "undefined") {
      return voltes;
    } else {
      return 0;
    }
  }

  // Es passa un cohet i el nº de voltes que ha fet. Si ja ha finalitzat la cursa
  // es posa a l'array de classificació i es retorna true, en cas contrari
  // es retorna false.
  public classificar(cohet: Cohet): boolean {
    let voltes: number | undefined = this._competidors.get(cohet.codi);

    if (typeof voltes != "undefined") {
      voltes++;

      this._competidors.set(cohet.codi, voltes);
      if (voltes === this.voltes) {
        this._classificacio.push(cohet);
        return true;
      }
    }

    return false;
  }
 
}