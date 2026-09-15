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
  min-height: 100vh;
  min-height: 100dvh;
  box-sizing: border-box;
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  padding: 2rem;

  background: #ff650d;
}

.hero-video {
  position: relative;
  flex-shrink: 0;

  width: clamp(160px, 45vw, 420px);
  aspect-ratio: 1 / 1;
  height: auto;

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
  max-width: 90vw;
}
h1{
  font-size: clamp(2rem, 6vw, 3rem);
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

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    gap: 1.75rem;
    padding: 1.5rem;
  }

  .hero-video {
    width: clamp(200px, 70vw, 320px);
  }

  .content {
    text-align: center;
  }

  h1 {
    text-align: center;
  }
}
</style>