<template>
  <div>
    <div
      :id="id"
      class="card rocket-card"
      data-toggle="modal"
      data-target="#propulsors"
      @click="clicar()"
    >
      <div class="card-header text-center">
        <strong>{{ name }}</strong>
      </div>
      <div class="card-body d-flex justify-content-center">
          <slot></slot>
      </div>
      <div class="card-footer text-center">{{ motors }} propulsor<span v-if="motors > 1"></span></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

@Component
export default class RocketCard extends Vue {
  @Prop() private id!: string;
  @Prop() private motors!: number;
  @Prop() private name!: string;

  @Emit()
  clicar(): void {
    this.$emit("clickcohet", this.motors);
  }
  
}
</script>

<style src="@/styles/rocketCard.css" scoped>
</style>
