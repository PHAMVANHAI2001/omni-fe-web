<template>
  
  <section class="card">
    <figure class="card-image loading"></figure>
    <div class="card-detail">
      <h3 class="card-title loading"></h3>
      <p class="card-description loading"></p>
    </div>
  </section>

</template>

<style lang="scss">

// .card {
//   overflow: hidden;
//   background: white;
//   border-radius: .25rem;
//   margin-bottom: 25px;
//   width: 100%;
//   box-shadow: 
//     0 15px 30px 0 rgba(0,0,0,0.05),
//     0 5px 15px 0 rgba(0,0,0,.05);
//   transition: ease box-shadow 0.3s;
//   &:hover {
//    box-shadow: 
//     0 15px 60px 0 rgba(0,0,0,0.08),
//     0 5px 25px 0 rgba(0,0,0,.08);
//   }
// }

.card-detail {
  padding: .5rem 1rem;

  h3 { 
    font-size: 1.5rem; 
    margin-bottom: none; 
    line-height: .09;
  }

  p {
    line-height: 1.3rem;  
  }
}

.card-image {
  margin: 0;
  padding: 0;
  height: 200px;
  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;
  }
}


.loading {
  position: relative;
  background-color: #E2E2E2;

  &.card-image {
    border-radius: 0;
  }

  &::after {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .2), transparent);
    animation: loading 0.5s infinite;
  }
}

@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

.card-title.loading {
  height: 1.8rem;
}

.card-image.image {
  max-width: 100%;
  height: auto;
}

.card-description.loading {
  height: 80px;
}

</style>

<script>

</script>