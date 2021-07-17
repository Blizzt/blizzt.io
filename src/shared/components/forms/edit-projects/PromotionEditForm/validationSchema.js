// Dependencies
import * as Yup from 'yup';
import * as validationRegExp from '@types/regexp';

const validationSchema = Yup.object().shape({
  webUrl: Yup.string()
    .matches(validationRegExp.REGEXP_HTTPS_URL, 'You must indicate a valid URL starting with HTTPS.')
    .nullable(),

  kickstarterUrl: Yup.string()
    .matches(validationRegExp.REGEXP_KICKSTARTER, 'You must specify a valid kickstarter.com address.')
    .nullable(),

  steamUrl: Yup.string()
    .matches(validationRegExp.REGEXP_STEAM_STORE, 'You must specify a valid store.steampowered.com address.')
    .nullable(),

  playstationUrl: Yup.string()
    .matches(validationRegExp.REGEXP_PLAYSTATION_STORE, 'You must specify a valid store.playstation.com address.')
    .nullable(),

  xboxUrl: Yup.string()
    .matches(validationRegExp.REGEXP_XBOX_STORE, 'You must specify a valid xbox.com address.')
    .nullable(),

  googlePlayUrl: Yup.string()
    .matches(validationRegExp.REGEXP_PLAY_STORE, 'You must specify a valid play.google.com address.')
    .nullable(),

  appleStoreUrl: Yup.string()
    .matches(validationRegExp.REGEXP_APP_STORE, 'You must specify a valid apps.apple.com address.')
    .nullable(),

  twitchUrl: Yup.string()
    .matches(validationRegExp.REGEXP_TWITCH, 'You must specify a valid twitch.com address.')
    .nullable(),

  youtubeUrl: Yup.string()
    .matches(validationRegExp.REGEXP_YOUTUBE, 'You must specify a valid youtube.com address.')
    .nullable(),

  facebookUrl: Yup.string()
    .matches(validationRegExp.REGEXP_FACEBOOK, 'You must specify a valid facebook.com address.')
    .nullable(),

  twitterUrl: Yup.string()
    .matches(validationRegExp.REGEXP_TWITTER, 'You must specify a valid twitter.com address.')
    .nullable(),

  instagramUrl: Yup.string()
    .matches(validationRegExp.REGEXP_INSTAGRAM, 'You must specify a valid instagram.com address.')
    .nullable(),

  vkUrl: Yup.string()
    .matches(validationRegExp.REGEXP_VK, 'You must specify a valid vk.com address.')
    .nullable(),

  discordUrl: Yup.string()
    .matches(validationRegExp.REGEXP_DISCORD, 'You must specify a valid discord.com/invite address.')
    .nullable(),

  redditUrl: Yup.string()
    .matches(validationRegExp.REGEXP_REDDIT, 'You must specify a valid reddit.com address.')
    .nullable(),

  telegramUrl: Yup.string()
    .matches(validationRegExp.REGEXP_TELEGRAM, 'You must specify a valid t.me address.')
    .nullable()

});

export default validationSchema;
