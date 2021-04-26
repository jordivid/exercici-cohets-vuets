<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*{
    box-sizing: border-box;
}

body{
    background-color: lightgray;
    background-image: url("assets/nebula.jpg");
    background-repeat: repeat-y;
    background-position: fixed;
    background-size: cover;
}
</style>
