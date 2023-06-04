import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import dummy_screens_spanish from './features/DummyScreens/spanish.json';
import dummy_screens_english from './features/DummyScreens/english.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  resources: {
    en: dummy_screens_english,
    es: dummy_screens_spanish,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
