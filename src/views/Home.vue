<template>
  <div class="home">
    <header>
      <h1 class="text-center pt-3">Fàbrica Orbital</h1>
      <h4 class="text-center">Prem sobre el cohet que vulguis fabricar</h4>
    </header>
    <div class="container mb-2 d-flex flex-wrap justify-content-center">
      <RocketCard id="rocket1" motors="1" name="Cohet de Fira" @clickcohet="omplirFormulari">
        <img src="./../assets/rocket1.png" alt="Cohet" />
      </RocketCard>
      <RocketCard id="rocket2" motors="2" name="Cohet de Becari" @clickcohet="omplirFormulari">
        <img src="./../assets/rocket2.png" alt="Cohet" />
      </RocketCard>
      <RocketCard id="rocket3" motors="3" name="Cohet de Llarg Abast" @clickcohet="omplirFormulari">
        <img src="./../assets/rocket3.png" alt="Cohet" />
      </RocketCard>
      <RocketCard id="rocket4" motors="4" name="Cohet Orbital" @clickcohet="omplirFormulari">
        <img src="./../assets/rocket4.png" alt="Cohet" />
      </RocketCard>
      <RocketCard id="rocket5" motors="5" name="Fragata Sideral" @clickcohet="omplirFormulari">
        <img src="./../assets/rocket5.png" alt="Cohet" />
      </RocketCard>
      <RocketCard id="rocket6" motors="6" name="Star Destroyer" @clickcohet="omplirFormulari">
        <img src="./../assets/rocket6.png" alt="Cohet" />
      </RocketCard>
    </div>
    <div class="modal" id="propulsors">
      <div class="modal-dialog">
        <div class="modal-content d-flex justify-content-center">
          <div class="modal-header">
            <h4 class="modal-title">Dades del cohet</h4>
            <button
              id="btCancelUp"
              type="button"
              class="close"
              data-dismiss="modal"
            >
              &times;
            </button>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <form>
              <div class="form-group">
                <label for="codi" class="font-weight-bold">Codi</label>
                <input
                  id="codi"
                  type="text"
                  class="form-control form-control-sm"
                  v-model.trim="codi"
                />
                <div id="errcodi" class="invalid-feedback"></div>
              </div>
              <div>
                <div class="form-group mt-2 propeller" v-for="(prop, index) of props" :key="prop">
                  <label :for="prop" class="font-weight-bold">{{"Propulsor " + prop.substr(4,1)}}</label>
                  <select class="form-control form-control-sm" :id="prop" v-model.number="power[index]">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              id="btCancel"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cance·la
            </button>
            <button id="btOK" type="button" class="btn btn-primary" @click="crearCohet">
              Fabricar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container d-flex justify-content-center">
      <div id="contenidorTaula">
        <h4 class="text-center p-3">Cohets fabricats</h4>
        <table class="table table-responsive">
          <thead>
            <th>
              <button id="btNuke" class="bg-danger">
                <img src="./../assets/atomic.png" alt="Explosió atòmica" />
              </button>
            </th>
            <th>Cohet</th>
            <th>P1</th>
            <th>P2</th>
            <th>P3</th>
            <th>P4</th>
            <th>P5</th>
            <th>P6</th>
          </thead>
          <tbody id="magatzem">
            <tr :id="cohet.codi" v-for="cohet of cohets.values()" :key="cohet.codi">
              <td>
                <button type="button" class="btn btn-sm btn-danger" @click="eliminarCohet(cohet.codi)">X</button>
              </td>
              <td :id="'img_' + cohet.codi" class="p-1 d-flex flex-column align-items-center">
                <img :src="cohetImage(cohet.getImage())" alt="Cohet" width="80px" height="auto">
                <!-- <img :src="cohetExplosioImage()" alt="Cohet explotant" width="80px" height="100px"> -->
                <span style="font-size: 10px">{{ cohet.codi }}</span>
              </td>
              <td v-for="propulsor of cohet.propulsors" :key="propulsor.id">
                {{ propulsor.maxpower }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h4 class="text-center mt-4">Vols veure els cohets en acció?</h4>
    <div class="container d-flex justify-content-center mt-3">
      <div>
        <input
          id="voltes"
          type="number"
          class="form-control mr-2"
          placeholder="Nº de voltes"
          v-model.number="voltes"
        />
        <div id="errvoltes" class="invalid-feedback"></div>
      </div>
      <div>
        <button id="btCursa" type="button" class="btn btn-primary" :disabled="btCursaDisabled == true" @click="carregarCursa">
          A la cursa!
        </button>
      </div>
    </div>
    <audio id="petard" src="./../assets/explosio.mp3"></audio>
    <audio id="granpetard" src="./../assets/explobig.mp3"></audio>
  </div>
</template>

<script lang="ts" src="@/scripts/home.ts">
</script>

<style src="@/styles/home.css" scoped></style>
