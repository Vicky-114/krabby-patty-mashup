import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './i18n/locales/en.json';
import zh from './i18n/locales/zh.json';
import zhTW from './i18n/locales/zh-TW.json';
import fr from './i18n/locales/fr.json';
import ko from './i18n/locales/ko.json';
import ja from './i18n/locales/ja.json';
import de from './i18n/locales/de.json';
import es from './i18n/locales/es.json';
import ru from './i18n/locales/ru.json';
import ptBR from './i18n/locales/pt-BR.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      'zh-TW': { translation: zhTW },
      fr: { translation: fr },
      ko: { translation: ko },
      ja: { translation: ja },
      de: { translation: de },
      es: { translation: es },
      ru: { translation: ru },
      'pt-BR': { translation: ptBR },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
