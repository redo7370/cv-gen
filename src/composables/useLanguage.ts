import { ref, computed } from 'vue'
import translations from '@/i18n/translations.json'

export type LanguageCode = 'de' | 'en' | 'ru' | 'fr' | 'es' | 'it' | 'sq' | 'uk' | 'el'

export interface LanguageOption {
  code: LanguageCode
  label: string
  flag: string
}

export const languages: LanguageOption[] = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'sq', label: 'Shqip', flag: '🇦🇱' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
]

const STORAGE_KEY = 'cv-gen-language'

function getInitialLanguage(): LanguageCode {
  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached && languages.some((l) => l.code === cached)) {
      return cached as LanguageCode
    }
  } catch {
    // localStorage not available
  }
  return 'en'
}

// Module-level singleton state
const currentLanguage = ref<LanguageCode>(getInitialLanguage())

export function useLanguage() {
  const t = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (translations as Record<string, Record<string, unknown>>)[currentLanguage.value] as Record<string, any>
  })

  const currentFlag = computed(() => {
    return languages.find((l) => l.code === currentLanguage.value)?.flag ?? '�🇧'
  })

  const currentLabel = computed(() => {
    return languages.find((l) => l.code === currentLanguage.value)?.label ?? 'English'
  })

  function setLanguage(code: LanguageCode) {
    currentLanguage.value = code
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // localStorage not available
    }
  }

  return {
    currentLanguage,
    t,
    currentFlag,
    currentLabel,
    languages,
    setLanguage,
  }
}
