<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'

const router = useRouter()
const { t } = useLanguage()

const navigateToCreate = () => {
  router.push('/create')
}

onMounted(() => {
  // Setup intersection observer for smooth fade-in animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    },
    { threshold: 0.1 },
  )

  // Observe all feature cards and steps
  document.querySelectorAll('.feature-card, .step').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">{{ t.home.heroTitle }}</h1>
        <p class="hero-subtitle">{{ t.home.heroSubtitle }}</p>
        <div class="hero-decoration">
          <div class="decoration-line"></div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>{{ t.home.scrollHint }}</span>
        <div class="scroll-arrow">↓</div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-container">
        <div class="feature-card">
          <div class="feature-icon">📄</div>
          <h2>{{ t.home.features.templates.title }}</h2>
          <p>{{ t.home.features.templates.description }}</p>
          <span class="dev-badge">{{ t.home.features.templates.badge }}</span>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h2>{{ t.home.features.design.title }}</h2>
          <p>{{ t.home.features.design.description }}</p>
          <span class="dev-badge">{{ t.home.features.design.badge }}</span>
        </div>

        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h2>{{ t.home.features.fast.title }}</h2>
          <p>{{ t.home.features.fast.description }}</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h2>{{ t.home.features.preview.title }}</h2>
          <p>{{ t.home.features.preview.description }}</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💾</div>
          <h2>{{ t.home.features.export.title }}</h2>
          <p>{{ t.home.features.export.description }}</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h2>{{ t.home.features.privacy.title }}</h2>
          <p>{{ t.home.features.privacy.description }}</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works-section">
      <h2 class="section-title">{{ t.home.howItWorks.title }}</h2>
      <div class="steps-container">
        <div class="step">
          <div class="step-number">1</div>
          <h3>{{ t.home.howItWorks.step1.title }}</h3>
          <p>{{ t.home.howItWorks.step1.description }}</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>{{ t.home.howItWorks.step2.title }}</h3>
          <p>{{ t.home.howItWorks.step2.description }}</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>{{ t.home.howItWorks.step3.title }}</h3>
          <p>{{ t.home.howItWorks.step3.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">{{ t.home.cta.title }}</h2>
        <p class="cta-description">{{ t.home.cta.description }}</p>
        <button @click="navigateToCreate" class="cta-button">
          {{ t.home.cta.button }}
          <span class="button-arrow">→</span>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>{{ t.home.footer }}</p>
    </footer>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  background: #fafafa;
  position: relative;
  overflow-x: hidden;
}

/* Hero Section - Schlichte Farben */
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  background: #2c3e50;
  color: white;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  position: relative;
}

.hero-title {
  font-size: 5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  letter-spacing: -2px;
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
}

.hero-subtitle {
  font-size: 1.75rem;
  font-weight: 300;
  margin: 0 0 2rem 0;
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.3s forwards;
  color: rgba(255, 255, 255, 0.9);
}

.hero-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.6s forwards;
}

.decoration-line {
  width: 120px;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.6;
  z-index: 1;
  animation: gentleBounce 3s ease-in-out infinite;
}

.scroll-indicator span {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.scroll-arrow {
  font-size: 1.5rem;
}

@keyframes gentleBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

/* Features Section */
.features-section {
  padding: 6rem 2rem;
  background: #fafafa;
  position: relative;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  transition: all 0.5s ease;
  border: 1px solid #e5e7eb;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
}

.feature-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: #cbd5e1;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
  transition: transform 0.5s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
  transition: color 0.3s ease;
}

.feature-card:hover h2 {
  color: #475569;
}

.feature-card p {
  font-size: 1rem;
  line-height: 1.7;
  color: #64748b;
  margin: 0;
}

.dev-badge {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #94a3b8;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: background 0.3s ease;
}

.feature-card:hover .dev-badge {
  background: #64748b;
}

/* How It Works Section */
.how-it-works-section {
  padding: 6rem 2rem;
  background: #f1f5f9;
  position: relative;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin: 0 0 4rem 0;
  color: #1e293b;
}

.steps-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.step {
  flex: 1;
  min-width: 250px;
  text-align: center;
  padding: 2rem;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.6s ease;
}

.step.animate-in {
  opacity: 1;
  transform: scale(1);
}

.step-number {
  width: 60px;
  height: 60px;
  background: #2c3e50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  margin: 0 auto 1.5rem auto;
  position: relative;
  transition: all 0.4s ease;
}

.step:hover .step-number {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(44, 62, 80, 0.2);
}

.step h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #1e293b;
}

.step p {
  font-size: 1rem;
  line-height: 1.7;
  color: #64748b;
  margin: 0;
}

.step-arrow {
  font-size: 2rem;
  color: #cbd5e1;
}

/* CTA Section */
.cta-section {
  padding: 8rem 2rem;
  background: #fafafa;
  position: relative;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
}

.cta-description {
  font-size: 1.25rem;
  color: #64748b;
  line-height: 1.7;
  margin: 0 0 3rem 0;
}

.cta-button {
  padding: 1.25rem 3rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  background: #2c3e50;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.4s ease;
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(44, 62, 80, 0.25);
  background: #34495e;
}

.cta-button:active {
  transform: translateY(-1px);
}

.button-arrow {
  font-size: 1.5rem;
  transition: transform 0.4s ease;
  display: inline-block;
}

.cta-button:hover .button-arrow {
  transform: translateX(5px);
}

/* Footer */
.footer {
  padding: 2rem;
  text-align: center;
  background: #1e293b;
  color: #94a3b8;
}

.footer p {
  margin: 0;
  font-size: 0.875rem;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .cta-title {
    font-size: 2rem;
  }

  .steps-container {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
  }

  .features-container {
    grid-template-columns: 1fr;
  }
}
</style>
