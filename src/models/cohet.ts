import { Propulsor } from "./propulsor";

export default class Cohet {
  private _codi;
  private _propulsors: Propulsor[];
  private _curpower;
  private _posX;
  private _posY;
  public static ACC_FACTOR = 10; // Factor d'acceleració
  public static DEC_FACTOR = 10; // Factor de frenada

  constructor(codi: string, props: number[]) {
    let id = 0;
    this._codi = codi;
    this._propulsors = [];
    this._curpower = 0;
    this._posX = 0;
    this._posY = 0;

    for (const propulsor of props) {
      this._propulsors.push(new Propulsor(propulsor, codi + (++id).toString()));
    }
  }

  // Verifica l'existència d'un cohet a l'array
  public static hasCohet(codi: string, cohets: Map<string, Cohet>): boolean {
    const cohet: Cohet | undefined = cohets.get(codi);
    if (typeof cohet === "undefined"){
      return false;
    } else {
      return true;
    }
  }

  public static getCohet(codi: string, cohets: Cohet[]): Cohet | null {
    for (const cohet of cohets) {
      if (cohet.codi === codi) {
        return cohet;
      }
    }

    return null;
  }

  // Converteix l'array de cohets en string
  public static serialitzar(cohets: Map<string, Cohet>, to: string): void {
    const rockets: Cohet[] = [];

    for (const cohet of cohets.values()) {
      rockets.push(cohet);
    }
    sessionStorage.setItem(to, JSON.stringify(rockets));
  }

  // Restaura l'array de cohets
  public static deserialitzar(from: string): Map<string, Cohet> {
    class myProp {
      _maxpower = 0;
    }

    class myRocket {
      _codi = "";
      _curpower = 0;
      _propulsors: myProp[] = [];
    }

    const rockets: Map<string, Cohet> = new Map<string, Cohet>();
    const cohets: Cohet[] = [];
    const guardats: string | null = sessionStorage.getItem(from);

    if (typeof guardats === "string") {
      const rockets = JSON.parse(guardats);
      let rocket: myRocket;

      for (rocket of rockets) {
        const props: number[] = [];
        for (const prop of rocket._propulsors) {
          props.push(prop._maxpower);
        }
        cohets.push(new Cohet(rocket._codi, props));
      }
    }

    for (const cohet of cohets) {
      rockets.set(cohet.codi, cohet);
    }

    return rockets;
  }

  public get codi(): string {
    return this._codi;
  }

  public get propulsors(): Propulsor[] {
    return this._propulsors;
  }

  public get curpower(): number {
    return this._curpower;
  }

  public set curpower(power: number) {
    this._curpower = power;
  }

  public get posX(): number {
    return this._posX;
  }

  public set posX(x: number) {
    this._posX = x;
  }

  public get posY(): number {
    return this._posY;
  }

  public set posY(y: number) {
    this._posY = y;
  }

  // Obtenció màxima potència d'un cohet
  public getMaxPower(): number {
    let maxpower = 0;

    for (const propulsor of this.propulsors) {
      maxpower += propulsor.maxpower;
    }

    return maxpower;
  }

  // Obtenció imatge vinculada a cohet segons nº propulsors
  public getImage(): string {
    return `rocket${this.propulsors.length}.png`;
  }

  // Acceleració del cohet
  public accelerar(): boolean {
    const maxpower: number = this.getMaxPower();
    let curpower: number = this.curpower;

    if (curpower === maxpower) {
      return false;
    }

    curpower += Cohet.ACC_FACTOR;
    if (curpower > maxpower) {
      curpower = maxpower;
    }
    this.curpower = curpower;

    return true;
  }

  // Frenada del cohet
  public frenar(): boolean {
    let curpower: number = this.curpower;

    if (curpower === 0) {
      return false;
    }

    curpower -= Cohet.DEC_FACTOR;
    if (curpower < 0) {
      curpower = 0;
    }
    this.curpower = curpower;

    return true;
  }

  public aturar(): void {
    this.curpower = 0;
  }

  // Posicionament del cohet a la graella de la cursa
  public codiCohet(): string {
    const codi = `
            <div id="${
              this.codi
            }" style="display: inline-block; z-index: 100; position: absolute; top: -100px; left: -100px">
                <img src="./../assets/${this.getImage()}" alt="${this.codi}">
            </div>
        `;
    return codi;
  }
}
