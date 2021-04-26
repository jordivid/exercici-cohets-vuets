import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from "@/store/types"
import Cohet from "../models/cohet"

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    cohets: new Map<string, Cohet>()
  },
  getters: {
    getCohets(state): Map<string, Cohet> {
      return state.cohets;
    },
    getCohet(state) {
      return function(codi: string): Cohet | undefined {
        return state.cohets.get(codi);
      }
    }
  },
  mutations: {
    setCohets(state, cohets: Map<string, Cohet>): void {
      state.cohets = cohets;
    },
    setCohet(state, cohet: Cohet): void {
      state.cohets.set(cohet.codi, cohet);
    },
    removeCohet(state, codi: string): void {
      state.cohets.delete(codi);
    }
  },
  actions: {
    addCohet(context, cohet: Cohet) {
      context.commit("setCohet", cohet);
    },
    deleteCohet(context, codi: string) {
      context.commit("removeCohet", codi);
    },
    putCohets(context, cohets: Map<string, Cohet>) {
      context.commit("setCohets", cohets);
    }
  }
}

export default new Vuex.Store<RootState>(store);