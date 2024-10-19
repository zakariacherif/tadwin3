// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: {
        "role_owner": "مالك المدونة",
        "role_editor": "ضيف",
        // Add more translations as needed
      },
    },
  },
  lng: 'ar', // Set the default language to Arabic
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // Disable suspense mode to prevent conflicts in Next.js
  },
});

export default i18n;
