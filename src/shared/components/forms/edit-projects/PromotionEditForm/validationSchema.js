// Dependencies
import * as Yup from 'yup';
import * as validationRegExp from '@types/regexp';

const validationSchema = Yup.object().shape({
  web: Yup.string()
    .matches(validationRegExp.REGEXP_HTTPS_URL, 'You must indicate a valid  starting with HTTPS.')
    .nullable(),

  kickstarter: Yup.string()
    .matches(validationRegExp.REGEXP_KICKSTARTER, 'You must specify a valid kickstarter.com address.')
    .nullable(),

  steam: Yup.string()
    .matches(validationRegExp.REGEXP_STEAM_STORE, 'You must specify a valid store.steampowered.com address.')
    .nullable(),

  playstation: Yup.string()
    .matches(validationRegExp.REGEXP_PLAYSTATION_STORE, 'You must specify a valid store.playstation.com address.')
    .nullable(),

  xbox: Yup.string()
    .matches(validationRegExp.REGEXP_XBOX_STORE, 'You must specify a valid xbox.com address.')
    .nullable(),

  android: Yup.string()
    .matches(validationRegExp.REGEXP_PLAY_STORE, 'You must specify a valid play.google.com address.')
    .nullable(),

  ios: Yup.string()
    .matches(validationRegExp.REGEXP_APP_STORE, 'You must specify a valid apps.apple.com address.')
    .nullable(),

  twitch: Yup.string()
    .matches(validationRegExp.REGEXP_TWITCH, 'You must specify a valid twitch.com address.')
    .nullable(),

  youtube: Yup.string()
    .matches(validationRegExp.REGEXP_YOUTUBE, 'You must specify a valid youtube.com address.')
    .nullable(),

  facebook: Yup.string()
    .matches(validationRegExp.REGEXP_FACEBOOK, 'You must specify a valid facebook.com address.')
    .nullable(),

  twitter: Yup.string()
    .matches(validationRegExp.REGEXP_TWITTER, 'You must specify a valid twitter.com address.')
    .nullable(),

  instagram: Yup.string()
    .matches(validationRegExp.REGEXP_INSTAGRAM, 'You must specify a valid instagram.com address.')
    .nullable(),

  vk: Yup.string()
    .matches(validationRegExp.REGEXP_VK, 'You must specify a valid vk.com address.')
    .nullable(),

  discord: Yup.string()
    .matches(validationRegExp.REGEXP_DISCORD, 'You must specify a valid discord.com/invite address.')
    .nullable(),

  reddit: Yup.string()
    .matches(validationRegExp.REGEXP_REDDIT, 'You must specify a valid reddit.com address.')
    .nullable(),

  telegram: Yup.string()
    .matches(validationRegExp.REGEXP_TELEGRAM, 'You must specify a valid t.me address.')
    .nullable()

});

export default validationSchema;
