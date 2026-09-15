<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppIcon from '../components/icons/AppIcon.vue'

// Estado para controlar a abertura/fechamento do menu mobile
const isMobileMenuOpen = ref(false)

// Seção atualmente ativa na navegação
const activeSection = ref('sobre')

// Alterna o estado do menu mobile (abrir/fechar)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Fecha o menu mobile
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Função para rolar suavemente até uma seção específica
const scrollToSection = (id: string) => {
  closeMobileMenu()
  activeSection.value = id
  const el = document.getElementById(id)
  if (el) {
    const yOffset = -90 // Compensação da altura do header fixo
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

const handleCardClick = (event: MouseEvent, id: string) => {
  if ((event.target as HTMLElement).closest('a')) {
    return
  }

  scrollToSection(id)
}

const handleCardKeyDown = (event: KeyboardEvent, id: string) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    scrollToSection(id)
  }
}

// Fecha o menu mobile caso a tecla ESC seja pressionada
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Adiciona e remove os ouvintes de eventos do ciclo de vida
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <!-- ================= CONTAINER PRINCIPAL DA PÁGINA ================= -->
  <div class="home-page">

    <!-- ================= CABEÇALHO / BARRA DE NAVEGAÇÃO ================= -->
    <header class="site-header" :class="{ 'is-expanded': isMobileMenuOpen }">
      <!-- Navegação para Desktop (exibida em telas >= 768px) -->
      <nav class="desktop-nav" aria-label="Navegação principal">
        <a
          href="#sobre"
          :class="['nav-item', { active: activeSection === 'sobre' }]"
          @click.prevent="scrollToSection('sobre')"
        >
          <AppIcon name="home" :size="20" />
          <span>Sobre mim</span>
        </a>
        <a
          href="#projetos"
          :class="['nav-item', { active: activeSection === 'projetos' }]"
          @click.prevent="scrollToSection('projetos')"
        >
          <AppIcon name="projects" :size="20" />
          <span>Projetos</span>
        </a>
        <a
          href="#faculdade"
          :class="['nav-item', { active: activeSection === 'faculdade' }]"
          @click.prevent="scrollToSection('faculdade')"
        >
          <AppIcon name="graduation" :size="20" />
          <span>Faculdade</span>
        </a>
        <a
          href="#contato"
          :class="['nav-item', { active: activeSection === 'contato' }]"
          @click.prevent="scrollToSection('contato')"
        >
          <AppIcon name="whatsapp" :size="20" />
          <span>Contato</span>
        </a>
      </nav>

      <!-- Barra superior no Mobile (exibida em telas < 768px) -->

      <div class="mobile-header-bar">
        <!-- Nome / Marca no Mobile -->
        <a href="#sobre" class="mobile-brand" @click.prevent="scrollToSection('sobre')">
          <span class="brand-first">Felipe</span>
          <span class="brand-last">Davids</span>
        </a>

        <!-- Botão com as 3 barrinhas do menu hambúrguer -->

        <button
          class="hamburger-btn"
          :class="{ 'is-active': isMobileMenuOpen }"
          type="button"
          aria-label="Alternar menu de navegação"
          :aria-expanded="isMobileMenuOpen"
          @click="toggleMobileMenu"
        >
          <span class="bar bar-1"></span>
          <span class="bar bar-2"></span>
          <span class="bar bar-3"></span>
        </button>
      </div>

      <!-- Menu Dropdown Suspenso no Mobile -->
      <transition name="mobile-drawer">
        <nav v-if="isMobileMenuOpen" class="mobile-dropdown-menu" aria-label="Menu móvel">
          <a
            href="#sobre"
            :class="['mobile-nav-link', { active: activeSection === 'sobre' }]"
            @click.prevent="scrollToSection('sobre')"
          >
            <AppIcon name="home" :size="22" />
            <span>Sobre mim</span>
          </a>
          <a
            href="#projetos"
            :class="['mobile-nav-link', { active: activeSection === 'projetos' }]"
            @click.prevent="scrollToSection('projetos')"
          >
            <AppIcon name="projects" :size="22" />
            <span>Projetos</span>
          </a>
          <a
            href="#faculdade"
            :class="['mobile-nav-link', { active: activeSection === 'faculdade' }]"
            @click.prevent="scrollToSection('faculdade')"
          >
            <AppIcon name="graduation" :size="22" />
            <span>Faculdade</span>
          </a>
          <a
            href="#contato"
            :class="['mobile-nav-link', { active: activeSection === 'contato' }]"
            @click.prevent="scrollToSection('contato')"
          >
            <AppIcon name="whatsapp" :size="22" />
            <span>Contato</span>
          </a>
        </nav>
      </transition>
    </header>

    <!-- ================= CONTEÚDO PRINCIPAL (MAIN-CONTENT) ================= -->
    <main class="main-content">

      <!-- ================= SEÇÃO 1: SOBRE MIM (HERO / INTRO-PANEL) ================= -->
      <section id="sobre" class="intro-panel" aria-labelledby="intro-title">
        <!-- Coluna de Redes Sociais à esquerda -->
        <aside class="social-links" aria-label="Redes sociais">
          <a href="#" aria-label="WhatsApp" class="social-link" title="WhatsApp">
            <AppIcon name="whatsapp" :size="22" />
          </a>
          <a href="#" aria-label="Instagram" class="social-link" title="Instagram">
            <AppIcon name="instagram" :size="22" />
          </a>
          <a href="#" aria-label="LinkedIn" class="social-link" title="LinkedIn">
            <AppIcon name="linkedin" :size="22" />
          </a>
          <a href="#" aria-label="GitHub" class="social-link" title="GitHub">
            <AppIcon name="github" :size="22" />
          </a>
        </aside>

        <!-- Foto de Perfil (Felipe Davids) -->
        <img
          src="../Icon/me.png"
          alt="Foto de Felipe Davids"
          class="intro-image"
        />

        <!-- Informações Sobre Mim (Saudação, Nome, Cargo e Biografia) -->
        <div class="intro-copy">
          <p class="greeting">Olá! Sou</p>
          <h1 id="intro-title">Felipe <strong>Davids</strong></h1>
          <p class="role">Desenvolvedor | Estudante</p>
          <p class="bio">
            Sou estudante de Sistemas de Informação e desenvolvedor apaixonado por tecnologia. 
            Transformo ideias em sites, sistemas e soluções digitais, unindo programação, 
            criatividade e propósito para criar experiências funcionais e que realmente geram resultados..
          </p>
        </div>
      </section>

      <!-- ================= SEÇÃO 2: PROJETOS E EXPERIÊNCIAS (CARDS) ================= -->
      <section id="projetos" class="projects" aria-labelledby="projects-title">
        <div class="projects-heading">
          <p class="section-kicker">Explore meu trabalho</p>
          <h2 id="projects-title">Projetos e experiências</h2>
        </div>

        <div class="projects-list">
          <!-- Card 01: Faculdade -->
          <article
            class="project-card card-01"
            role="link"
            tabindex="0"
            @click="handleCardClick($event, 'faculdade')"
            @keydown="handleCardKeyDown($event, 'faculdade')"
          >
            <span class="card-number">01</span>
            <div class="card-icon" aria-hidden="true">
              <AppIcon name="graduation" :size="26" />
            </div>
            <div class="card-content">
              <h3>Faculdade</h3>
              <p>Sistemas de Informação</p>
            </div>
            <a href="#faculdade" class="card-action" aria-label="Ver Faculdade" @click.prevent="scrollToSection('faculdade')">
              <AppIcon name="arrow-action" :size="22" />
            </a>
          </article>

          <!-- Card 02: Projetos -->
          <article
            class="project-card card-02"
            role="link"
            tabindex="0"
            @click="handleCardClick($event, 'featured')"
            @keydown="handleCardKeyDown($event, 'featured')"
          >
            <span class="card-number">02</span>
            <div class="card-icon" aria-hidden="true">
              <AppIcon name="screen" :size="26" />
            </div>
            <div class="card-content">
              <h3>Projetos</h3>
              <p>Criações e experiências</p>
            </div>
            <a href="#featured" class="card-action" aria-label="Ver Projetos" @click.prevent="scrollToSection('featured')">
              <AppIcon name="arrow-action" :size="22" />
            </a>
          </article>

          <!-- Card 03: Serviços -->
          <article
            class="project-card card-03"
            role="link"
            tabindex="0"
            @click="handleCardClick($event, 'contato')"
            @keydown="handleCardKeyDown($event, 'contato')"
          >
            <span class="card-number">03</span>
            <div class="card-icon" aria-hidden="true">
              <AppIcon name="service" :size="26" />
            </div>
            <div class="card-content">
              <h3>Serviços</h3>
              <p>Soluções para sua ideia</p>
            </div>
            <a href="#contato" class="card-action" aria-label="Ver Serviços" @click.prevent="scrollToSection('contato')">
              <AppIcon name="arrow-action" :size="22" />
            </a>
          </article>
        </div>
      </section>

      <!-- ================= SEÇÃO 3: INDICADORES E ESTATÍSTICAS ================= -->
      <section class="aleatorio" aria-label="Indicadores do perfil">
        <!-- Indicador 1: Projetos concluídos -->
        <div class="stat-item">
          <div class="stat-icon" aria-hidden="true">
            <AppIcon name="code" :size="22" />
          </div>
          <div>
            <strong>+4</strong>
            <span>Projetos concluídos</span>
          </div>
        </div>

        <!-- Indicador 2: Tecnologias dominadas -->
        <div class="stat-item">
          <div class="stat-icon" aria-hidden="true">
            <AppIcon name="people" :size="22" />
          </div>
          <div>
            <strong>+4</strong>
            <span>Tecnologias dominadas</span>
          </div>
        </div>

        <!-- Indicador 3: Foco em evolução -->
        <div class="stat-item">
          <div class="stat-icon stat-icon-accent" aria-hidden="true">
            <AppIcon name="arrow-action" :size="26" />
          </div>
          <div>
            <strong>100%</strong>
            <span>Foco em evolução</span>
          </div>
        </div>

        <!-- Indicador 4: Café e boas ideias -->
        <div class="stat-item">
          <div class="stat-icon" aria-hidden="true">
            <AppIcon name="coffee" :size="22" />
          </div>
          <div>
            <strong>∞</strong>
            <span>Café e boas ideias</span>
          </div>
        </div>
      </section>

      <!-- ================= SEÇÃO 4: PROJETOS EM DESTAQUE ================= -->
      <section id="featured" class="featured-projects" aria-labelledby="featured-title">
        <div class="featured-heading">
          <div>
            <p class="featured-kicker">— Meus Sites</p>
            <h2 id="featured-title">Projetos <strong>Features</strong></h2>
          </div>
          <a href="#" class="all-projects-link">
            <span>Ver todos os projetos</span>
            <AppIcon name="arrow-right" :size="16" />
          </a>
        </div>

        <div class="featured-list">
          <!-- Projeto Destaque 1: Sistema de Gestão à vista -->
          <a href="#" class="featured-card">
            <span class="external-link" aria-hidden="true">
              <AppIcon name="external-link" :size="18" />
            </span>
            <div class="project-image-placeholder project-image-01" aria-label="Espaço reservado para a imagem do projeto"></div>
            <h3>Sistema de Gestão à vista</h3>
            <p>Sistema industrial para empresas de pequeno porte com foco em otimização de processos e monitoramento em tempo
              real.</p>
          </a>

          <!-- Projeto Destaque 2: Agenda de comissão -->
          <a href="https://comiss-o-lemon.vercel.app/" class="featured-card">
            <span class="external-link" aria-hidden="true">
              <AppIcon name="external-link" :size="18" />
            </span>
            <div class="project-image-placeholder project-image-02" aria-label="Espaço reservado para a imagem do projeto"></div>
            <h3>Agenda de comissão</h3>
            <p>Pequena aplicação de controle de comissões.</p>
          </a>

          <!-- Projeto Destaque 3: Batedor de ponto -->
          <a href="https://batedor-three.vercel.app/login" class="featured-card">
            <span class="external-link" aria-hidden="true">
              <AppIcon name="external-link" :size="18" />
            </span>
            <div class="project-image-placeholder project-image-03" aria-label="Espaço reservado para a imagem do projeto"></div>
            <h3>Batedor de ponto</h3>
            <p>Aplicação para controle de jornada de funcionários, com relatórios e gestão de horários.</p>
          </a>
        </div>
      </section>

      <!-- ================= SEÇÃO 5: EXPERIÊNCIAS DETALHADAS ================= -->
      <section id="faculdade" class="experience-list" aria-label="Experiências">
        <!-- Experiência 1: Faculdade -->
        <article class="experience-card experience-card-left">
          <span class="experience-number">01</span>
          <div>
            <h2>Faculdade</h2>
            <p class="experience-label">Sistemas de informação</p>
            <p>
              Sou estudante de Sistemas de Informação na UNINASSAU, em Juazeiro do Norte, com foco em desenvolvimento 
              de software e criação de soluções digitais. A formação amplia minha visão sobre tecnologia, 
              programação, bancos de dados e desenvolvimento de sistemas, conhecimentos que aplico diretamente 
              nos projetos que desenvolvo.
            </p>
          </div>
        </article>

        <!-- Experiência 2: Projetos -->
        <article class="experience-card experience-card-right">
          <span class="experience-number">02</span>
          <div>
            <h2>Projetos</h2>
            <p class="experience-label">Sistemas de informação</p>
            <p>
              Ofereço o desenvolvimento de soluções digitais personalizadas para pessoas, profissionais e empresas
              que buscam utilizar a tecnologia para melhorar seus processos e fortalecer sua presença no ambiente digital.
            </p>
          </div>
        </article>
      </section>

      <!-- ================= SEÇÃO 6: BANNER DE CONTATO ================= -->
      <section id="contato" class="contact-banner" aria-labelledby="contact-title">
        <div class="contact-text">
          <h2 id="contact-title">Vamos construir algo juntos?</h2>
          <p>Estou sempre em busca de novos desafios e oportunidades.</p>
          <p>Se você tem uma ideia, um projeto ou apenas quer conversar sobre tecnologia, será um prazer falar com você.</p>
        </div>
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" class="contact-button">
          <AppIcon name="whatsapp" :size="20" />
          <span>Entrar em contato</span>
          <span aria-hidden="true" class="contact-arrow">→</span>
        </a>
      </section>
    </main>

    <!-- ================= RODAPÉ DO SITE (SITE-FOOTER) ================= -->
    <footer class="site-footer">
      <!-- Linha superior do rodapé -->
      <div class="footer-top-row">
        <div class="footer-brand">
          <strong>Felipe Davids</strong>
          <span>Desenvolvedor | Estudante</span>
        </div>

        <span class="footer-divider" aria-hidden="true"></span>

        <div class="footer-message">
          <strong>Tecnologia que conecta.</strong>
          <span>Ideias que transformam.</span>
        </div>

        <!-- Links de redes sociais no rodapé -->
        <nav class="footer-socials" aria-label="Redes sociais do rodapé">
          <a href="#" aria-label="WhatsApp" class="footer-social-link" title="WhatsApp">
            <AppIcon name="whatsapp" :size="18" />
          </a>
          <a href="#" aria-label="Instagram" class="footer-social-link" title="Instagram">
            <AppIcon name="instagram" :size="18" />
          </a>
          <a href="#" aria-label="LinkedIn" class="footer-social-link" title="LinkedIn">
            <AppIcon name="linkedin" :size="18" />
          </a>
          <a href="#" aria-label="GitHub" class="footer-social-link" title="GitHub">
            <AppIcon name="github" :size="18" />
          </a>
        </nav>
      </div>

      <!-- Linha inferior do rodapé com Direitos Autorais -->
      <div class="footer-bottom-row">
        <p class="copyright">© 2026 Felipe Davids. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ==========================================================================
   1. CONTAINER GERAL DA PÁGINA (HOME-PAGE)
   ========================================================================== */
.home-page {
  width: 100%;
  max-width: 100vw;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding-top: 1px;
  overflow-x: hidden;
  background-color: #090302;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('../Icon/fundo.png');
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
}

/* ==========================================================================
   2. CABEÇALHO E NAVEGAÇÃO (SITE-HEADER & NAVBAR)
   ========================================================================== */
.site-header {
  position: sticky;
  top: 14px;
  z-index: 1000;
  width: min(100% - 32px, 714px);
  margin: 14px auto 0;
  padding: 8px 16px;
  border: 2px solid #e37d43;
  border-radius: 40px;
  background: rgba(7, 7, 7, 0.92);
  box-shadow: 0 0 12px rgba(241, 90, 0, 0.18);
  transition: border-radius 0.3s ease, padding 0.3s ease;
}

.site-header.is-expanded {
  border-radius: 24px;
}

/* --- Barra de Navegação no Desktop --- */
.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 24px;
  color: #f5f5f5;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-item:hover,
.nav-item.active {
  background: #c94b08;
  color: #fff;
}

/* --- Barra Superior no Mobile (Oculta no Desktop) --- */
.mobile-header-bar {
  display: none;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.mobile-brand {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.brand-first {
  color: #fff;
}

.brand-last {
  color: #ff650d;
  font-weight: 800;
}

/* --- Botão Hambúrguer (As 3 Barrinhas) --- */
.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 36px;
  height: 32px;
  padding: 5px 4px;
  background: rgba(255, 101, 13, 0.1);
  border: 1px solid rgba(255, 101, 13, 0.4);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.hamburger-btn:hover {
  background: rgba(255, 101, 13, 0.2);
  border-color: #ff650d;
}

.hamburger-btn .bar {
  display: block;
  width: 100%;
  height: 2.5px;
  background-color: #ff650d;
  border-radius: 3px;
  transition: transform 0.25s ease, opacity 0.25s ease;
  transform-origin: center;
}

.hamburger-btn.is-active .bar-1 {
  transform: translateY(6.5px) rotate(45deg);
}

.hamburger-btn.is-active .bar-2 {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-btn.is-active .bar-3 {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* --- Menu Dropdown Suspenso no Mobile --- */
.mobile-dropdown-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 101, 13, 0.25);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 14px;
  color: #f1f1f1;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  background: rgba(201, 75, 8, 0.25);
  border-color: rgba(255, 101, 13, 0.6);
  color: #ff8c42;
}

/* Animações de entrada e saída do menu mobile */
.mobile-drawer-enter-active,
.mobile-drawer-leave-active {
  transition: all 0.25s ease;
}

.mobile-drawer-enter-from,
.mobile-drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ==========================================================================
   3. CONTAINER DE CONTEÚDO PRINCIPAL (MAIN-CONTENT)
   ========================================================================== */
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  min-height: 0;
  padding: 16px clamp(12px, 4vw, 40px);
  flex: 1;
}

.main-content a:hover {
  background-color: transparent;
}

/* ==========================================================================
   4. PAINEL SOBRE MIM / HERO (INTRO-PANEL)
   ========================================================================== */
.intro-panel {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  gap: clamp(24px, 5vw, 160px);
  width: min(100%, 860px);
  max-width: calc(100vw - 24px);
  min-height: clamp(370px, 44vw, 430px);
  margin: clamp(32px, 5vw, 48px) auto 32px;
  padding: clamp(32px, 5vw, 48px) clamp(24px, 5vw, 54px);
  border-radius: 28px;
  background: url('../Icon/Rectangle 20.png') center / 100% 100% no-repeat;
  overflow: visible;
}

/* --- Coluna de Redes Sociais no Painel --- */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  flex: 0 0 clamp(32px, 4vw, 42px);
  position: relative;
  z-index: 3;
}

.social-link {
  display: grid;
  place-items: center;
  width: 48px;
  height: 42px;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s ease, transform 0.2s ease;
}

.social-link img {
  width: 38px;
  height: 28px;
  object-fit: contain;
}

.social-link:hover {
  color: #ff650d;
  transform: translateY(-2px);
}

/* --- Foto de Felipe Davids --- */
.intro-image {
  position: absolute;
  z-index: 2;
  left: 22%;
  bottom: -90px;
  transform: translateX(-50%);
  width: clamp(280px, 35%, 330px);
  height: 112%;
  max-height: 480px;
  object-fit: contain;
  object-position: bottom center;
  pointer-events: none;
  filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.5));
  -webkit-mask-image: linear-gradient(to bottom, black 82%, rgba(0, 0, 0, 0) 100%);
  mask-image: linear-gradient(to bottom, black 82%, rgba(0, 0, 0, 0) 100%);
}

/* --- Bloco de Informações Textuais do Painel --- */
.intro-copy {
  position: relative;
  z-index: 3;
  width: min(52%, 400px);
  max-width: 400px;
  margin-left: auto;
  transform: translateY(40px);
  color: #fff;
  text-align: left;
}

.greeting,
.role {
  margin: 0;
  font-size: 14px;
}

.intro-copy h1 {
  margin: 2px 0 0;
  font-size: clamp(34px, 5.2vw, 60px);
  line-height: 1.02;
  font-weight: 350;
}

.intro-copy h1 strong {
  display: block;
  color: #ff650d;
  font-weight: 800;
}

.role {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.9);
}

.bio {
  max-width: 380px;
  margin: 14px 0 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: clamp(13px, 1.6vw, 14.5px);
  line-height: 1.45;
}

/* ==========================================================================
   5. SEÇÃO DE PROJETOS E EXPERIÊNCIAS (PROJECTS)
   ========================================================================== */
.projects {
  position: relative;
  z-index: 2;
  width: min(100%, 860px);
  margin: 8px auto 32px;
}

.projects-heading {
  margin-bottom: 16px;
  color: #fff;
  text-align: right;
}

.section-kicker {
  position: relative;
  display: inline-block;
  margin: 0 0 4px;
  color: #ff7802;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-shadow: 0 0 12px rgba(255, 120, 2, 0.45);
  text-transform: uppercase;
}

.section-kicker::after {
  display: block;
  width: 42px;
  height: 2px;
  margin: 6px 0 0 auto;
  border-radius: 999px;
  background: #ff7802;
  box-shadow: 0 0 10px rgba(255, 120, 2, 0.7);
  content: '';
}

.projects-heading h2 {
  margin: 0;
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 700;
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.project-card {
  position: relative;
  display: grid;
  grid-template-columns: 52px 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 12px;
  min-height: 220px;
  padding: 20px 18px 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 101, 13, 0.9);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(75, 30, 8, 0.72), rgba(7, 7, 7, 0.96));
  box-shadow: 0 0 16px rgba(241, 90, 0, 0.16);
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card-01 {
  background:
    linear-gradient(180deg, rgba(75, 30, 8, 0.72), rgba(7, 7, 7, 0.96)),
    url('../Icon/faculdade.png') center / cover;
}

.card-02 {
  background:
    linear-gradient(180deg, rgba(75, 30, 8, 0.72), rgba(7, 7, 7, 0.96)),
    url('../Icon/project.png') center / cover;
}

.card-03 {
  background:
    linear-gradient(180deg, rgba(75, 30, 8, 0.72), rgba(7, 7, 7, 0.96)),
    url('../Icon/site.png') center / cover;
}

.project-card:hover {
  transform: translateY(-4px);
}

.card-number {
  display: block;
  grid-column: 1 / -1;
  text-align: left;
  color: #ff650d;
  font-size: 28px;
  font-weight: 700;
}

.card-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-top: 16px;
  border: 1px solid rgba(255, 101, 13, 0.75);
  border-radius: 14px;
  color: #ff650d;
  background: rgba(255, 101, 13, 0.06);
}

.card-content {
  align-self: center;
  margin-top: 16px;
  text-align: left;
}

.project-card h3 {
  margin: 0 0 4px;
  font-size: 21px;
  font-weight: 700;
}

.project-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
}

.card-action {
  position: absolute;
  right: 16px;
  bottom: 14px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  color: #ff650d;
  text-decoration: none;
  border-radius: 50%;
  background: rgba(255, 101, 13, 0.08);
  transition: transform 0.2s ease;
}

.card-action:hover {
  transform: scale(1.1);
}

/* ==========================================================================
   6. SEÇÃO DE INDICADORES E ESTATÍSTICAS (ALEATORIO)
   ========================================================================== */
.aleatorio {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 20px;
  width: min(100%, 1000px);
  margin: 0 auto 32px;
  padding: 20px 36px;
  border: 1px solid #ff650d;
  border-radius: 30px;
  background: rgba(8, 8, 8, 0.9);
  box-shadow: 0 0 18px rgba(241, 90, 0, 0.14);
  color: #fff;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.stat-icon {
  display: grid;
  flex: 0 0 42px;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1.5px solid #ff650d;
  border-radius: 12px;
  color: #ff650d;
  background: rgba(255, 101, 13, 0.06);
}

.stat-icon-accent {
  border-color: #ff650d;
}

.stat-item strong,
.stat-item span {
  display: block;
}

.stat-item strong {
  color: #ff650d;
  font-size: 19px;
  line-height: 1.1;
  font-weight: 700;
}

.stat-item span {
  margin-top: 3px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 12px;
  line-height: 1.25;
}

/* ==========================================================================
   7. SEÇÃO DE PROJETOS EM DESTAQUE (FEATURED-PROJECTS)
   ========================================================================== */
.featured-projects {
  width: min(100%, 1100px);
  margin: 0 auto 36px;
  padding: 24px 38px 36px;
  border: 1px solid #ff650d;
  border-radius: 28px;
  background: rgba(9, 7, 6, 0.88);
  box-shadow: 0 0 18px rgba(241, 90, 0, 0.14);
}

.featured-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
  color: #fff;
}

.featured-kicker {
  margin: 0 0 4px;
  color: #ff650d;
  font-size: 14px;
}

.featured-heading h2 {
  margin: 0;
  font-size: clamp(22px, 3.5vw, 32px);
  font-weight: 400;
}

.featured-heading h2 strong {
  color: #ff650d;
  font-weight: 700;
}

.all-projects-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid #ff650d;
  border-radius: 20px;
  color: #fff;
  font-size: 12px;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}

.all-projects-link:hover {
  background: rgba(255, 101, 13, 0.15);
}

.featured-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.featured-card {
  position: relative;
  display: block;
  min-height: 190px;
  padding: 16px;
  border: 1px solid rgba(255, 101, 13, 0.48);
  border-radius: 20px;
  background: rgba(26, 13, 7, 0.85);
  color: #fff;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.featured-card:hover {
  transform: translateY(-3px);
}

.project-image-placeholder {
  height: 96px;
  margin-bottom: 10px;
  border-radius: 14px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.project-image-01 {
  background-image: url('../Icon/gestao.png');
}

.project-image-02 {
  background-image: url('../Icon/comisao.png');
}

.project-image-03 {
  background-image: url('../Icon/ponto.png');
}

.external-link {
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(10, 10, 10, 0.7);
  color: #ff650d;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.external-link:hover {
  transform: scale(1.1);
}

.featured-card h3 {
  margin: 0 0 4px;
  color: #ff650d;
  font-size: 14px;
  font-weight: 600;
}

.featured-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 12px;
  line-height: 1.35;
}

/* ==========================================================================
   8. SEÇÃO DE EXPERIÊNCIAS DETALHADAS (EXPERIENCE-LIST)
   ========================================================================== */
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: min(100%, 900px);
  margin: 0 auto 28px;
}

.experience-card {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 16px;
  width: 78%;
  padding: 18px 22px;
  border: 1px solid #ff650d;
  border-radius: 20px;
  background: linear-gradient(105deg, rgba(44, 20, 9, 0.92), rgba(7, 7, 7, 0.94));
  color: #fff;
}

.experience-card-left {
  align-self: flex-start;
}

.experience-card-right {
  align-self: flex-end;
}

.experience-number {
  color: #ff650d;
  font-size: 22px;
  font-weight: 700;
}

.experience-card h2 {
  margin: 0;
  font-size: 21px;
  font-weight: 600;
}

.experience-label {
  margin: 2px 0 10px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}

.experience-card div > p:last-child {
  margin: 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: 13px;
  line-height: 1.45;
}

/* ==========================================================================
   9. BANNER DE CONTATO (CONTACT-BANNER)
   ========================================================================== */
.contact-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: min(100%, 900px);
  margin: 0 auto 28px;
  padding: 22px 28px;
  border: 1px solid rgba(255, 101, 13, 0.6);
  border-radius: 16px;
  background: linear-gradient(rgba(8, 8, 8, 0.72), rgba(8, 8, 8, 0.85)), url('../Icon/fundo.png') center 48% / cover;
  color: #fff;
}

.contact-text h2 {
  margin: 0 0 6px;
  font-size: clamp(18px, 2.8vw, 24px);
}

.contact-text p {
  margin: 0 0 4px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  line-height: 1.4;
}

.contact-button {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border: 1px solid #ff650d;
  border-radius: 24px;
  background: rgba(201, 75, 8, 0.2);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.contact-button:hover {
  background: #ff650d;
}

.contact-arrow {
  color: #ff650d;
  font-size: 16px;
}

/* ==========================================================================
   10. RODAPÉ (SITE-FOOTER)
   ========================================================================== */
.site-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(100% - 32px, 900px);
  margin: 0 auto 16px;
  padding: 14px 20px;
  border: 1px solid #ff650d;
  border-radius: 16px;
  background: rgba(8, 8, 8, 0.94);
  color: #fff;
}

.footer-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
}

.footer-brand strong {
  font-size: 13px;
  color: #fff;
}

.footer-brand span {
  color: rgba(255, 255, 255, 0.65);
  font-size: 10px;
}

.footer-divider {
  width: 1px;
  height: 22px;
  background: rgba(255, 255, 255, 0.25);
}

.footer-message {
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 11px;
  line-height: 1.35;
}

.footer-message span {
  color: rgba(255, 255, 255, 0.8);
}

.footer-socials {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-social-link {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  background:transparent ;
  transition: color 0.2s ease;
}

.footer-social-link:hover {
  color: #ff650d;
}

.footer-bottom-row {
  border-top: 1px solid rgba(171, 22, 22, 0.1);
  padding-top: 8px;
  text-align: center;
}

.copyright {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
}

/* ==========================================================================
   11. MEDIA QUERIES (RESPONSIVIDADE POR DISPOSITIVO)
   ========================================================================== */

/* --------------------------------------------------------------------------
   A. TABLETS E CELULARES MÉDIOS (max-width: 768px)
   Ajusta navbar para modo hambúrguer, empilha cards e calibra o hero.
   -------------------------------------------------------------------------- */
@media (max-width: 768px) {
  /* Header em modo mobile */
  .site-header {
    width: calc(100% - 24px);
    padding: 8px 14px;
    border-radius: 20px;
  }

  /* Oculta navbar desktop e exibe a barra mobile */
  .desktop-nav {
    display: none;
  }

  .mobile-header-bar {
    display: flex;
  }

  /* Espaçamento do container principal */
  .main-content {
    padding: 16px 12px;
  }

  /* Painel Sobre Mim adaptado para tablets/celulares */
  .intro-panel {
    width: 100%;
    min-height: 360px;
    margin-top: 36px;
    padding: 28px 18px;
    border-radius: 22px;
    gap: 16px;
  }

  .social-links {
    flex: 0 0 28px;
    gap: 14px;
  }

  .social-link {
    width: 38px;
    height: 36px;
  }

  .social-link img {
    width: 24px;
    height: 24px;
  }

  /* Foto de perfil proporcional em telas médias */
  .intro-image {
    left: 28%;
    bottom: -50px;
    width: clamp(140px, 34vw, 200px);
    height: 110%;
    max-height: 390px;
  }

  /* Texto do painel em telas médias */
  .intro-copy {
    width: 55%;
    max-width: 320px;
    transform: translate(10px, 10px);
  }

  .intro-copy h1 {
    font-size: clamp(28px, 6.5vw, 42px);
  }

  .greeting,
  .role {
    font-size: 12px;
  }

  .bio {
    width: 100%;
    margin-top: 10px;
    font-size: 12.5px;
    line-height: 1.4;
    text-align: left;
  }

  /* Lista de projetos em 1 coluna */
  .projects-list {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .project-card {
    min-height: 170px;
  }

  /* Estatísticas em 2 colunas */
  .aleatorio {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 12px;
    padding: 18px 16px;
    border-radius: 22px;
  }

  /* Projetos em destaque no mobile */
  .featured-projects {
    padding: 18px 16px 24px;
    border-radius: 22px;
  }

  .featured-heading {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .featured-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* Cards de experiência em largura total */
  .experience-card {
    width: 100%;
    padding: 14px 16px;
  }

  /* Banner de contato empilhado verticalmente */
  .contact-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding: 18px 16px;
  }

  /* Rodapé adaptado em coluna centralizada */
  .footer-divider {
    display: none;
  }

  .footer-top-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
  }

  .footer-socials {
    margin-top: 4px;
  }
}

/* --------------------------------------------------------------------------
   B. SMARTPHONES PEQUENOS (max-width: 420px)
   Ajuste fino de fontes, espaçamentos e dimensões para celulares compactos.
   -------------------------------------------------------------------------- */
@media (max-width: 420px) {
  /* Header compacto */
  .site-header {
    width: calc(100% - 16px);
    margin-top: 10px;
    padding: 8px 12px;
  }

  /* Painel Sobre Mim com altura garantida para o texto */
  .intro-panel {
    min-height: 350px;
    margin-top: 28px;
    padding: 24px 14px;
    border-radius: 20px;
  }

  /* Foto proporcional para telas estreitas */
  .intro-image {
    left: 27%;
    bottom: -60px;
    width: auto;
    max-width: 60%;
    height: 100%;
    max-height: 100%;
  }

  /* Tipografia do painel para smartphones pequenos */
  .intro-copy {
    width: 58%;
    max-width: 235px;
    transform: translate(8px, 35px);
  }

  .intro-copy h1 {
    font-size: clamp(24px, 7.5vw, 32px);
  }

  .bio {
    font-size: 11.5px;
    line-height: 1.38;
    margin-top: 8px;
    text-align: left;
  }

  .social-links {
    flex: 0 0 24px;
    gap: 10px;
  }

  .social-link {
    width: 34px;
    height: 32px;
  }

  .social-link img {
    width: 22px;
    height: 22px;
  }

  /* Estatísticas compactas */
  .stat-icon {
    flex-basis: 36px;
    width: 36px;
    height: 36px;
  }

  .stat-item strong {
    font-size: 16px;
  }

  .stat-item span {
    font-size: 11px;
  }
}

/* --------------------------------------------------------------------------
   C. TELAS GRANDES E SMART TVs (min-width: 1440px)
   Expansão de largura e escala para monitores ultrawide e TVs.
   -------------------------------------------------------------------------- */
@media (min-width: 1440px) {
  .intro-panel {
    width: min(100%, 900px);
    min-height: 440px;
  }

  .intro-image {
    width: clamp(200px, 32%, 350px);
    height: 114%;
  }
}
</style>