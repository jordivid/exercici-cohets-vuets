<template>
  <div>
    <header>
      <h1 class="text-center pt-3">Classificació</h1>
    </header>
    <div class="container d-flex justify-content-center">
      <div id="contenidorTaula">
        <table class="table table-responsive p-3">
          <tbody id="classificacio">
            <tr v-for="[key, cohet] of cohets" :key="key">
              <td class="text-center">
                <span
                  class="d-flex justify-content-center align-items-center"
                  style="font-size: 30px"
                  >{{ key }}</span
                >
              </td>
              <td
                class="p-1 d-flex flex-column justify-content-center align-items-center"
              >
                <img
                  :src="cohetImage(cohet.getImage())"
                  alt="Cohet"
                  width="80px"
                  height="auto"
                />
                <span style="font-size: 10px">{{ cohet.codi }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button
        id="btTornar"
        type="button"
        class="btn btn-primary"
        @click="tornar"
      >
        Tornar
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="@/scripts/classificacio.ts"></script>

<style src="@/styles/classificacio.css" scoped></style>
