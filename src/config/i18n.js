import translations from '../locales/translations.js';

class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem('appLanguage') || 'fa';
    this.translations = translations;
  }

  setLanguage(language) {
    if (this.translations[language]) {
      this.currentLanguage = language;
      localStorage.setItem('appLanguage', language);
      this.updatePageLanguage();
    }
  }

  getLanguage() {
    return this.currentLanguage;
  }

  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];

    for (const k of keys) {
      value = value?.[k];
      if (!value) {
        return key;
      }
    }

    return value;
  }

  updatePageLanguage() {
    const html = document.documentElement;
    const LANGUAGES = {
      fa: { name: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
      en: { name: 'English', dir: 'ltr', flag: '🇺🇸' },
    };

    html.lang = this.currentLanguage;
    html.dir = LANGUAGES[this.currentLanguage].dir;

    this.updateAllTranslations();
  }

  updateAllTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const text = this.t(key);
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = text;
      } else if (element.childNodes.length === 0 || element.childNodes[0].nodeType === 3) {
        element.textContent = text;
      } else {
        const firstChild = element.firstChild;
        if (firstChild && firstChild.nodeType === 3) {
          firstChild.textContent = text;
        } else {
          const textNode = document.createTextNode(text);
          element.insertBefore(textNode, firstChild);
        }
      }
    });
  }

  updatePageAttribute(attr, value) {
    document.documentElement.setAttribute(attr, value);
  }
}

const i18n = new I18n();

export default i18n;
