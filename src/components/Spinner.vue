<template>
  <div class="d-flex align-items-center justify-content-center" style="height: 20em">
    <i class="fas fa-paw loader1"></i>
    <i class="fas fa-paw loader2"></i>
    <i class="fas fa-paw loader3"></i>
  </div>
</template>

<style scoped>
.loader1 {
  width: 3em;
  height: 3em;
  color: #212529;
  -webkit-animation: example 2s infinite -0.4s; /* Safari 4.0 - 8.0 */
  animation: example 2s infinite -0.4s;
}

.loader2 {
  width: 3em;
  height: 3em;
  color: #212529;
  -webkit-animation: example 2s infinite -0.2s; /* Safari 4.0 - 8.0 */
  animation: example 2s infinite -0.2s;
}

.loader3 {
  width: 3em;
  height: 3em;
  color: #212529;
  -webkit-animation: example 2s infinite; /* Safari 4.0 - 8.0 */
  animation: example 2s infinite;
}

@-webkit-keyframes example {
  0% {
    font-size: 1em;
  }

  50% {
    font-size: 2em;
  }

  100% {
    font-size: 1em;
  }
}

/* Standard syntax */
@keyframes example {
  0% {
    font-size: 1em;
  }

  50% {
    font-size: 2em;
  }

  100% {
    font-size: 1em;
  }
}
</style>
