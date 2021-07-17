// Dependencies
const NextI18Next = require('next-i18next').default;
const path = require('path');

module.exports = new NextI18Next({
  otherLanguages: ['en', 'es'],
  defaultLanguage: 'en',
  localePath: path.resolve('./src/shared/i18n/locales')
});
