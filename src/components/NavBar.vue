<!-- eslint-disable max-len -->
<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Monitoring as a Service</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#/confirmed-shifts">Confirmed Engineers </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/availability-shifts">Shift Availability</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: 'navBar',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #42b983;
}
</style>
