<template>
  <section class="hero">

    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="../Icon/503.mp4" type="video/mp4" />
    </video>

    <div class="overlay"></div>

    <div class="content">
      <h1>Erro <strong>503</strong></h1>
      <p>Projeto inacabado. Voltamos em breve.</p>
    </div>

  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  background: #ff650d;
}

.hero-video {
  position: relative;

  width: min(60vw, 60vh);
  height: min(60vw, 60vh);

  object-fit: cover;
  border-radius: 12px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 2;
}
h1{
  font-size: 3rem;
  color: #0A0A0A;
  text-align: left;
}
strong{
  color: #fff;
}
p{
  font-size: 1.0rem;
  color: #fff;
}
</style>