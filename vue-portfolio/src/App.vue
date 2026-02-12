<script setup lang="ts">
import { reactive, ref } from 'vue'

type Project = {
  name: string
  year: string
  description: string
  tech: string[]
  primaryTech: string[]
  images: string[]
}

const projects: Project[] = reactive([
  {
    name: 'dedouleur',
    year: '2026',
    description: 'Portfolio for a tattoo artist friend.',
    tech: ['React', 'Vue.js', 'TypeScript'],
    primaryTech: ['React', 'Vue.js', 'TypeScript'],
    images: [
      '/images/Project 1-1.png',
      '/images/Project 1-2.jpg',
      '/images/Project 1-3.png',
    ],
  },
  {
    name: 'FiveCorner',
    year: '2025',
    description: 'Streetwear brand site for FiveCorner.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    primaryTech: ['JavaScript'],
    images: [
      '/images/project2-1.png',
      '/images/project2-2.png',
      '/images/project2-3.jpg',
    ],
  },
  {
    name: 'HediRaiser',
    year: '2022',
    description: 'Streetwear brand site for HediRaiser.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    primaryTech: ['JavaScript'],
    images: [
      '/images/project3-1.jpg',
      '/images/project3-2.jpg',
      '/images/project3-3.jpg',
    ],
  },
])

const skills = reactive([
  { name: 'HTML5' },
  { name: 'CSS3' },
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'Vue.js' },
  { name: 'React' },
  { name: 'Git' },
])

const sliderIndices = reactive<Record<string, number>>(
  Object.fromEntries(projects.map((p) => [p.name, 0])),
)

const goToSlide = (key: string, index: number, total: number) => {
  const next = (index + total) % total
  sliderIndices[key] = next
}

const goToPrev = (key: string, total: number) => {
  const current = sliderIndices[key] ?? 0
  goToSlide(key, current - 1, total)
}

const goToNext = (key: string, total: number) => {
  const current = sliderIndices[key] ?? 0
  goToSlide(key, current + 1, total)
}

const year = ref(2026)
</script>

<template>
  <div id="top" class="app-shell">
    <main class="glass-card">
      <div class="glass-card-inner">
        <header class="header">
          <div class="header-top">
            <div class="avatar-wrapper">
              <span class="avatar-glow" />
              <img
                src="https://github.com/retardded.png"
                alt="Nikita Oleynichenko"
                class="avatar"
              />
            </div>
            <div class="identity">
              <div class="name-row">
                <h1 class="name">Nikita Oleynichenko</h1>
                <span class="badge-pill">Front‑End Developer</span>
              </div>
              <p class="title">Front‑end developer. Minimal UI. Monospace.</p>
            </div>
          </div>

          <div class="header-footer">
            <div class="contact">
              <a
                href="mailto:nikitaoleynichenko@icloud.com"
                class="contact-link"
              >
                nikitaoleynichenko@icloud.com
              </a>
              <span>·</span>
              <a
                href="https://github.com/retardded"
                target="_blank"
                rel="noreferrer"
                class="contact-link"
              >
                github.com/retardded
              </a>
            </div>
            <nav class="nav" aria-label="Sections">
              <a href="#projects" class="nav-link primary">
                <span>▸</span> View selected work
              </a>
              <a href="#skills" class="nav-link">
                <span>#</span> Skills
              </a>
              <a href="#experience" class="nav-link">
                <span>//</span> Experience
              </a>
            </nav>
          </div>
        </header>

        <section id="about" class="section" aria-labelledby="about-title">
          <div class="section-header">
            <h2 id="about-title" class="section-title">
              [about]
            </h2>
          </div>
          <div class="section-body">
            <p class="muted">
              Front‑end developer focused on clean, responsive interfaces with
              a minimal UI.
            </p>
          </div>
        </section>

        <div class="layout-grid">
          <section id="skills" class="section" aria-labelledby="skills-title">
            <div class="section-header">
              <h2 id="skills-title" class="section-title">
                [skills]
              </h2>
            </div>
            <div class="skills-grid">
              <div v-for="skill in skills" :key="skill.name" class="skill-pill">
                <span class="skill-name">{{ skill.name }}</span>
              </div>
            </div>
          </section>

          <section
            id="experience"
            class="section"
            aria-labelledby="experience-title"
          >
            <div class="section-header">
              <h2 id="experience-title" class="section-title">
                [experience]
              </h2>
            </div>
            <div class="experience-column">
              <article class="experience-item">
                <div class="experience-header">
                  <h3 class="experience-title">Front‑End Developer</h3>
                  <span class="experience-date">2020 – {{ year }}</span>
                </div>
                <p class="experience-company">Self‑employed</p>
                <ul class="experience-list">
                  <li>
                    Designing and building small brand sites and portfolios.
                  </li>
                </ul>
              </article>
            </div>
          </section>
        </div>

        <section id="projects" class="section" aria-labelledby="projects-title">
          <div class="section-header">
            <h2 id="projects-title" class="section-title">
              [my top‑3 projects]
            </h2>
          </div>
          <div class="projects-column">
            <article
              v-for="project in projects"
              :key="project.name"
              class="project"
            >
              <div
                class="project-slider"
                :aria-label="`${project.name} screenshots`"
              >
                <div class="slider-container">
                  <img
                    v-for="(src, i) in project.images"
                    :key="src"
                    :src="src"
                    :alt="`${project.name} view ${i + 1}`"
                    loading="lazy"
                    class="project-image"
                    :class="{ active: sliderIndices[project.name] === i }"
                  />
                </div>
                <button
                  v-if="project.images.length > 1"
                  type="button"
                  class="slider-btn prev"
                  aria-label="Previous image"
                  @click="
                    goToPrev(project.name, project.images.length)
                  "
                >
                  ‹
                </button>
                <button
                  v-if="project.images.length > 1"
                  type="button"
                  class="slider-btn next"
                  aria-label="Next image"
                  @click="
                    goToNext(project.name, project.images.length)
                  "
                >
                  ›
                </button>
                <div v-if="project.images.length > 1" class="slider-dots">
                  <button
                    v-for="(_, i) in project.images"
                    :key="i"
                    type="button"
                    class="slider-dot"
                    :class="{ active: sliderIndices[project.name] === i }"
                    @click="
                      goToSlide(project.name, i, project.images.length)
                    "
                  />
                </div>
              </div>
              <div class="project-content">
                <div class="project-name-row">
                  <h3 class="project-name">
                    {{ project.name }}
                  </h3>
                  <span class="project-meta">
                    {{ project.year }}
                  </span>
                </div>
                <p class="project-description">
                  {{ project.description }}
                </p>
                <div class="project-tech">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="tech-tag"
                    :class="{ strong: project.primaryTech.includes(tech) }"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <footer class="footer">
          <div class="footer-meta">
            <span>© {{ year }} Nikita</span>
            <span>·</span>
            <span class="framework-tag">Vue 3 + Vite</span>
          </div>
          <div class="framework-links">
            <a href="#top">back to top ↑</a>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>
