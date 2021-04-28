import { Component, Vue } from "vue-property-decorator";
import RocketCard from "@/components/RocketCard.vue";
import Cohet from "../models/cohet";

@Component({
  components: {
    RocketCard,
  },
})

export default class Home extends Vue {
  btCursaDisabled = true;
  voltes = "";
  codi = "";
  codiElim = "";
  props: string[] = [];
  power: number[] = [];
  granpet = false;

  created(): void {
    const cohets: Map<string, Cohet> = Cohet.deserialitzar("llista_cohets");

    this.$store.dispatch("putCohets", cohets);
    if (cohets.size === 0) {
      this.btCursaDisabled = true;
    } else {
      this.btCursaDisabled = false;
    }
  }

  // S'omple un array amb els id's pels inputs tipus select y un 
  // array amb la potència inicial de cada propulsor, vinculada al
  // select amb v-model.
  omplirFormulari(numcohet: number): void {
    this.props = [];
    this.power = [];
    for (let indx = 1; indx <= numcohet; indx++) {
      this.props.push("prop" + indx);
      this.power.push(10);
    }
  }

  // Retorna cohets del store
  get cohets(): Map<string, Cohet> {
    return this.$store.getters.getCohets;
  }

  // Retorna imatge d'un cohet
  get cohetImage() {
    return function(nom: string) {
      return require('./../assets/' + nom);
    }
  }

  // Retorna imatge de la explosió d'un cohet
  get cohetExplosioImage() {
    return function() {
      return require('./../assets/' + "explosio.gif");
    }
  }

  // Retorna un cohet del store
  getCohet(codi: string): Cohet {
    return this.$store.getters.getCohet(codi);
  }

  // Afegeix un cohet al store
  addCohet(cohet: Cohet): void {
    this.$store.dispatch("addCohet", cohet);
  }

  // Elimina un cohet del store
  eliminarCohet(codi: string): void {
    this.codiElim = codi;
    const element: HTMLElement = <HTMLElement>document.getElementById(codi);
    const imatge: HTMLElement = <HTMLElement>document.getElementById("img_" + codi);
    const petard: HTMLAudioElement = <HTMLAudioElement>document.getElementById("petard");
    
    imatge.innerHTML = "";
    imatge.classList.add("explosio");
    petard.play();
    setTimeout(() => {
      element.remove();
      this.suprimirCohet();
    }, 1000);
  }

  suprimirCohet(): void {
    this.$store.dispatch("deleteCohet", this.codiElim);
    this.codiElim = "";
    Cohet.serialitzar(this.cohets, "llista_cohets");
    if (this.cohets.size === 0) {
      this.btCursaDisabled = true;
    } else {
      this.btCursaDisabled = false;
    }
  }

  // Assigna tot l'array de cohets al store
  putCohets(cohets: Map<string, Cohet>): void {
    this.$store.dispatch("addCohet", cohets);
  }

  // Valida i crea un nou cohet
  crearCohet() : void {
    const codi: HTMLInputElement = <HTMLInputElement>document.getElementById("codi");
    const voltes: HTMLInputElement = <HTMLInputElement>document.getElementById("voltes");
    let cohet: Cohet | null = null;

    // S'elimina els errors d'una validació prèvia
    const errcodi: HTMLElement = <HTMLElement>document.getElementById("errcodi");
    const errvoltes: HTMLElement = <HTMLElement>document.getElementById("errvoltes");

    codi.classList.remove("is-invalid");
    voltes.classList.remove("is-invalid");
    errcodi.innerHTML = "";
    errvoltes.innerHTML = "";

    if (this.codi.length != 8) {
        codi.classList.add("is-invalid");
        errcodi.innerHTML = "El codi ha de tenir 8 caràcters";
        return;
    }

    // Es comprova que no existeixi un cohet amb el mateix codi
    if (Cohet.hasCohet(this.codi, this.cohets) === true) {
      codi.classList.add("is-invalid");
      errcodi.innerHTML = "Ja existeix un cohet amb aquest codi";
      return;
    }

    // Tot correcte, es crea el cohet.
    cohet = new Cohet(this.codi, this.power);
    this.addCohet(cohet);
    this.btCursaDisabled = false;

    Cohet.serialitzar(this.cohets, "llista_cohets");
    this.netejarFormulari();
  }

  // Inicialització del formulari de fabricació de cohets.
  netejarFormulari(): void {
    const codi: HTMLInputElement = <HTMLInputElement>document.getElementById("codi");
    const errcodi: HTMLElement = <HTMLElement>document.getElementById("errcodi");

    codi.classList.remove("is-invalid");
    errcodi.innerHTML = "";
    this.codi = "";
    for (let i = 0; i < this.power.length; i++) {
      this.power[i] = 10;
    }
  }

  carregarCursa(): void {
    const voltes: HTMLInputElement = <HTMLInputElement>document.getElementById("voltes");
    const errvoltes: HTMLElement = <HTMLElement>document.getElementById("errvoltes");
    const numvoltes = Math.floor(Number(this.voltes));

    // S'elimina l'error d'una validació prèvia
    voltes.classList.remove("is-invalid");
    errvoltes.innerHTML = "";

    if (!(numvoltes > 0) || numvoltes > 20) {
        voltes.classList.add("is-invalid");
        errvoltes.innerHTML = "Introduïr entre 1 i 20 voltes";
        return;
    }

    // Obrir ruta de la cursa
    sessionStorage.setItem("voltes_cursa", numvoltes.toString());
    this.$router.push("/cursa"); 
  }

  // S'elimina tots els cohets fabricats
  fulminarTot(): void {
    const petard: HTMLAudioElement = <HTMLAudioElement>document.getElementById("granpetard");

    if (this.cohets.size > 0) {
      this.$store.dispatch("putCohets", new Map<string, Cohet>());
      sessionStorage.removeItem("llista_cohets");
      this.granpet = true;      
      petard.play();
      setTimeout(() => {
        this.granpet = false;
      }, 4000);
    }
  }

}
