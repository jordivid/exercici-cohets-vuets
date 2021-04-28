import { Component, Vue } from "vue-property-decorator";
import Cohet from "../models/cohet";

@Component
export default class Classificacio extends Vue {
    cohets: Map<string, Cohet> = new Map<string, Cohet>();

    created() {
        const cohets = Cohet.deserialitzar("classificacio_cohets");
        let indx = 0;

        for (const cohet of cohets.values()) {
            ++indx;
            this.cohets.set(indx.toString(), cohet);
        }
        
    }

    // Retorna imatge d'un cohet
    get cohetImage() {
        return function(nom: string) {
            return require('./../assets/' + nom);
        }
    }

    tornar(): void {
        this.$router.push("/"); 
    }

}