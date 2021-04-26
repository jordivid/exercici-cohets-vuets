<template>
  <div>
    <div id="raceArea">
      <div id="roca1">
        <img src="./../assets/pedra.png" alt="Roca" />
      </div>
      <div id="roca2">
        <img src="./../assets/pedra.png" alt="Roca" />
      </div>
      <div id="roca3">
        <img src="./../assets/pedrot.png" alt="Roca" />
      </div>
      <div id="deathstar">
        <img
          src="./../assets/deathstar.png"
          alt="Roca"
          style="top: 10px; left: 80%;"
        />
      </div>



    </div>
    <div id="control" class="bg-white p-2 w-100">
      <form class="form-inline">
        <div class="form-group">
          <label for="codi" class="font-weight-bold mr-2">Cohet</label>
          <select name="codi" id="codi" class="form-control mr-3">
            <option v-for="cohet of cohets" :value="cohet.codi" :key="cohet.codi">{{ cohet.codi }}</option>
          </select>
        </div>
        <button
          id="btAccelerar"
          type="button"
          class="btn btn-primary btn-sm ml-1 mr-1"
        >
          Accelerar
        </button>
        <button
          id="btFrenar"
          type="button"
          class="btn btn-primary btn-sm ml-1 mr-1"
        >
          Frenar
        </button>
        <button
          id="btIniciar"
          type="button"
          class="btn btn-primary btn-sm ml-1 mr-1"
        >
          Iniciar
        </button>
        <button
          id="btAturar"
          type="button"
          class="btn btn-danger btn-sm ml-1 mr-2"
        >
          Aturar
        </button>
        <button id="btTornar" type="button" class="btn btn-danger btn-sm">
          Tornar
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="@/scripts/cursa.ts">
</script>

<style src="@/styles/cursa.css" scoped></style>
