<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCVStore } from '@/composables/useCVStore'
import { useLanguage, languages } from '@/composables/useLanguage'
import type { LanguageCode } from '@/composables/useLanguage'

const router = useRouter()
const { isSPADark, toggleTheme } = useCVStore()
const { t, currentFlag, setLanguage, currentLanguage } = useLanguage()

const menuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)
const burgerRef = ref<HTMLElement | null>(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function navigateTo(path: string) {
  router.push(path)
  menuOpen.value = false
}

function selectLanguage(code: LanguageCode) {
  setLanguage(code)
}

function handleClickOutside(e: MouseEvent) {
  if (
    menuOpen.value &&
    menuRef.value &&
    !menuRef.value.contains(e.target as Node) &&
    burgerRef.value &&
    !burgerRef.value.contains(e.target as Node)
  ) {
    menuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="navbar" :class="{ dark: isSPADark }">
    <div class="navbar-content">
      <!-- Hamburger / Menu Button -->
      <div class="navbar-left">
        <button
          ref="burgerRef"
          class="burger-btn"
          :class="{ active: menuOpen }"
          @click="toggleMenu"
          type="button"
          :aria-label="t.nav.menu"
        >
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </button>

        <!-- Dropdown Menu -->
        <Transition name="menu-fade">
          <div v-if="menuOpen" ref="menuRef" class="dropdown-menu" :class="{ dark: isSPADark }">
            <!-- Page Links -->
            <div class="menu-pages">
              <button class="menu-page-item" @click="navigateTo('/')">
                <span class="page-icon">🏠</span>
                <span>{{ t.nav.home }}</span>
              </button>
            </div>

            <!-- Permanent Divider -->
            <div class="menu-divider-permanent"></div>

            <!-- Language Section -->
            <div class="menu-language-header">
              <span class="lang-header-icon">🌐</span>
              <span>{{ t.nav.language }}</span>
            </div>
            <div class="menu-languages">
              <button
                v-for="lang in languages"
                :key="lang.code"
                class="menu-lang-item"
                :class="{ selected: currentLanguage === lang.code }"
                @click="selectLanguage(lang.code)"
              >
                <span class="lang-flag">{{ lang.flag }}</span>
                <span class="lang-label">{{ lang.label }}</span>
                <span v-if="currentLanguage === lang.code" class="lang-check">✓</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Right side actions -->
      <div class="navbar-actions">
        <button class="lang-quick-btn" @click="toggleMenu" type="button">
          <span>{{ currentFlag }}</span>
        </button>
        <button class="theme-toggle-btn" @click="toggleTheme" type="button">
          <span v-if="isSPADark">☀️ {{ t.nav.lightMode }}</span>
          <span v-else>🌙 {{ t.nav.darkMode }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: #2d3748;
  color: white;
  padding: 15px 30px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;
}

.navbar.dark {
  background: #1e293b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
}

.navbar-left {
  position: relative;
  display: flex;
  align-items: center;
}

/* ── Burger Button ── */
.burger-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
}

.burger-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.burger-btn.active {
  background: rgba(255, 255, 255, 0.25);
}

.burger-line {
  display: block;
  width: 100%;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.burger-btn.active .burger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.burger-btn.active .burger-line:nth-child(2) {
  opacity: 0;
}

.burger-btn.active .burger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Dropdown Menu ── */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 260px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  z-index: 1001;
  color: #1e293b;
}

.dropdown-menu.dark {
  background: #1e293b;
  color: #e2e8f0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

/* ── Page Links ── */
.menu-pages {
  padding: 8px;
}

.menu-page-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 14px;
  background: none;
  border: none;
  border-radius: 8px;
  color: inherit;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;
}

.menu-page-item:hover {
  background: rgba(0, 0, 0, 0.06);
}

.dropdown-menu.dark .menu-page-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* Short centered hover divider between page items */
.menu-page-item + .menu-page-item {
  margin-top: 2px;
}

.menu-page-item + .menu-page-item::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.dropdown-menu.dark .menu-page-item + .menu-page-item::before {
  background: rgba(255, 255, 255, 0.1);
}

.menu-page-item + .menu-page-item:hover::before,
.menu-page-item:hover + .menu-page-item::before {
  opacity: 1;
}

.page-icon {
  font-size: 18px;
  line-height: 1;
}

/* ── Permanent Divider ── */
.menu-divider-permanent {
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
  margin: 4px 14px;
}

.dropdown-menu.dark .menu-divider-permanent {
  background: rgba(255, 255, 255, 0.12);
}

/* ── Language Section ── */
.menu-language-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #94a3b8;
}

.lang-header-icon {
  font-size: 14px;
}

.menu-languages {
  padding: 0 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.menu-lang-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 14px;
  background: none;
  border: none;
  border-radius: 8px;
  color: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.menu-lang-item:hover {
  background: rgba(0, 0, 0, 0.06);
}

.dropdown-menu.dark .menu-lang-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.menu-lang-item.selected {
  background: rgba(59, 130, 246, 0.1);
  font-weight: 600;
}

.dropdown-menu.dark .menu-lang-item.selected {
  background: rgba(59, 130, 246, 0.2);
}

.lang-flag {
  font-size: 20px;
  line-height: 1;
}

.lang-label {
  flex: 1;
  text-align: left;
}

.lang-check {
  color: #3b82f6;
  font-weight: 700;
  font-size: 14px;
}

/* ── Right Actions ── */
.navbar-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.lang-quick-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lang-quick-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.theme-toggle-btn {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.theme-toggle-btn:active {
  transform: translateY(0);
}

/* ── Menu Transition ── */
.menu-fade-enter-active {
  transition: all 0.2s ease-out;
}

.menu-fade-leave-active {
  transition: all 0.15s ease-in;
}

.menu-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}

.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
