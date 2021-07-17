// Dependencies
import React, { useMemo, useRef } from 'react';
import { useFormik } from 'formik';

// Styled Components
import {
  Layout,
  Body,
  BrandingIcon,
  VisibilityContainer
} from './styles';
import { Medium } from '@styled-components/text';
import { common } from '@styled-components/common';

// Assets
import KickstarterIcon from '@assets/images/kickstarter-logo-icon.svg';
import TelegramIcon from '@assets/images/telegram-logo-icon.svg';

import {
  SaveOutline,
  GlobeOutline,
  LogoFacebook,
  LogoTwitter,
  LogoYoutube,
  LogoDiscord,
  LogoTwitch,
  LogoInstagram,
  LogoSteam,
  LogoPlaystation,
  LogoXbox,
  LogoGooglePlaystore,
  LogoAppleAppstore,
  LogoReddit,
  PhonePortraitOutline,
  DesktopOutline,
  ShareSocialOutline,
  GameControllerOutline,
  VideocamOutline,
  PeopleOutline,
  LogoVk
} from 'react-ionicons';

// Components
import FormFooter from '@forms-components/FormFooter';
import FormColumn from '@forms-components/FormColumn';

import Button, { buttonTypesId } from '@components/buttons/MainButton';
import InputText from '@components/inputs/TextInput';
import Collapsible from '@components/foldouts/Collapsible';
import SwitchInput from '@components/switchs/SwitchInput';

// Hooks
import useFormValidation from '../../../../hooks/useFormValidation';

// Validators
import validationSchema from './validationSchema';

function PromotionEditForm({
  onSubmit = () => {},
  project: {
    isPublic = false,
    webUrl = '',
    kickstarterUrl = '',
    steamUrl = '',
    playstationUrl = '',
    xboxUrl = '',
    googlePlayUrl = '',
    appleStoreUrl = '',
    twitchUrl = '',
    youtubeUrl = '',
    facebookUrl = '',
    twitterUrl = '',
    instagramUrl = '',
    vkUrl = '',
    discordUrl = '',
    redditUrl = '',
    telegramUrl = ''
  }
}) {
  // Ref
  const actionButtonRef = useRef(null);

  // Formik
  const formik = useFormik({
    initialValues: {
      isPublic,
      webUrl,
      kickstarterUrl,
      steamUrl,
      playstationUrl,
      xboxUrl,
      googlePlayUrl,
      appleStoreUrl,
      twitchUrl,
      youtubeUrl,
      facebookUrl,
      twitterUrl,
      instagramUrl,
      vkUrl,
      discordUrl,
      redditUrl,
      telegramUrl
    },
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      onSubmit(values, formikHelpers, actionButtonRef.current);
    }
  });

  const [isValidForm, changeValue, getErrorFromField] = useFormValidation(formik);

  const renderMain = useMemo(() => (
    <FormColumn
      separator={false}
      title={'Official website'}
      paragraphs={[
        'You can indicate to the community the official website of your project.'
      ]}
      fields={[
        <InputText
          key={'1'}
          label={'Official website'}
          error={getErrorFromField('webUrl')}
          value={formik.values.webUrl}
          placeholder={'https://www.your-project-name.com'}
          icon={
            <GlobeOutline
              width={'22px'}
              height={'22px'}
              color={common.colors.PRIMARY}
            />
          }
          onChangeText={webUrl => changeValue('webUrl', webUrl)}
        />,
        <InputText
          key={'2'}
          label={'Your project on Kickstarter'}
          description={'You can tell users that they can contribute to your project from Kickstarter.'}
          error={getErrorFromField('kickstarterUrl')}
          value={formik.values.kickstarterUrl}
          placeholder={'https://kickstarter.com/projects/project-id/project-name'}
          icon={
            <BrandingIcon
              src={KickstarterIcon}
              width={'18px'}
              height={'18px'}
            />
          }
          onChangeText={kickstarterUrl => changeValue('kickstarterUrl', kickstarterUrl)}
        />,
        <VisibilityContainer key={'3'}>
          <SwitchInput
            checked={formik.values.isPublic}
            label={'Visibility'}
            description={'Whenever you want, your project can disappear from public view. Note that those who have collectibles from your games can still access them.'}
            valueLabel={formik.values.isPublic ? 'People can see your project' : 'Your project is hidden'}
            onChange={(checked) => changeValue('isPublic', checked)}
          />
        </VisibilityContainer>
      ]}
    />
  ), [formik.values.isPublic, formik.values.kickstarterUrl, getErrorFromField]);

  const renderPC = useMemo(() => (
    <Collapsible
      title={'PC'}
      icon={(
        <DesktopOutline
          width={'22px'}
          height={'22px'}
          color={common.colors.PRIMARY}
        />
      )}
    >
      <FormColumn
        separator={false}
        title={'Purchase on PC'}
        paragraphs={[
          'If your project is on Steam, you can make it possible for users to access your game directly from your project details.'
        ]}
        fields={[
          <InputText
            key={'1'}
            label={'Steam'}
            error={getErrorFromField('steamUrl')}
            value={formik.values.steamUrl}
            placeholder={'https://store.steampowered.com/app/your-game-steam-id'}
            icon={
              <LogoSteam
                width={'22px'}
                height={'22px'}
                color={common.colors.BLACK}
              />
            }
            onChangeText={steamUrl => changeValue('steamUrl', steamUrl)}
          />
        ]}
      />
    </Collapsible>
  ), [formik.values.steamUrl, getErrorFromField]);

  const renderConsole = useMemo(() => (
    <Collapsible
      title={'PlayStation / Xbox'}
      icon={(
        <GameControllerOutline
          width={'22px'}
          height={'22px'}
          color={common.colors.PRIMARY}
        />
      )}
    >
      <FormColumn
        separator={false}
        title={'Purchase on consoles'}
        paragraphs={[
          'If your project is available on consoles, you can indicate the link to the stores so that your users can buy on both PlayStation and Xbox.'
        ]}
        fields={[
          <InputText
            key={'1'}
            label={'PlayStation Store'}
            error={getErrorFromField('playstationUrl')}
            value={formik.values.playstationUrl}
            placeholder={'https://store.playstation.com/en-us/product/your-product-id'}
            icon={
              <LogoPlaystation
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_PSSTORE}
              />
            }
            onChangeText={playstationUrl => changeValue('playstationUrl', playstationUrl)}
          />,
          <InputText
            key={'2'}
            label={'Xbox Store'}
            error={getErrorFromField('xboxUrl')}
            value={formik.values.xboxUrl}
            placeholder={'https://www.xbox.com/en-us/games/your-project-name'}
            icon={
              <LogoXbox
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_XBOX}
              />
            }
            onChangeText={xboxUrl => changeValue('xboxUrl', xboxUrl)}
          />
        ]}
      />
    </Collapsible>
  ), [formik.values.playstationUrl, formik.values.xboxUrl, getErrorFromField]);

  const renderMobile = useMemo(() => (
    <Collapsible
      title={'Android / iOS'}
      icon={(
        <PhonePortraitOutline
          width={'22px'}
          height={'22px'}
          color={common.colors.PRIMARY}
        />
      )}
    >
      <FormColumn
        separator={false}
        title={'Purchase on mobile'}
        paragraphs={[
          'If your project is available on Android or iOS, you can indicate the link to your project in the stores so that users can download it to their phone.'
        ]}
        fields={[
          <InputText
            key={'1'}
            label={'Google PlayStore'}
            error={getErrorFromField('googlePlayUrl')}
            value={formik.values.googlePlayUrl}
            placeholder={'https://play.google.com/store/apps/details?id=your-project-playstore-id'}
            icon={
              <LogoGooglePlaystore
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_PLAYSTORE}
              />
            }
            onChangeText={googlePlayUrl => changeValue('googlePlayUrl', googlePlayUrl)}
          />,
          <InputText
            key={'2'}
            label={'Apple AppStore'}
            error={getErrorFromField('appleStoreUrl')}
            value={formik.values.appleStoreUrl}
            placeholder={'https://apps.apple.com/cl/app/your-project-name'}
            icon={
              <LogoAppleAppstore
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_APPSTORE}
              />
            }
            onChangeText={appleStoreUrl => changeValue('appleStoreUrl', appleStoreUrl)}
          />

        ]}
      />
    </Collapsible>
  ), [formik.values.googlePlayUrl, formik.values.appleStoreUrl, getErrorFromField]);

  const renderChannels = useMemo(() => (
    <Collapsible
      title={'Video and Streaming'}
      icon={(
        <VideocamOutline
          width={'22px'}
          height={'22px'}
          color={common.colors.PRIMARY}
        />
      )}
    >
      <FormColumn
        separator={false}
        title={'Broadcasting channels'}
        paragraphs={[
          'If you have a Twitch or Youtube channel where you can make videos or live broadcasts, you can get your channels to users and increase interest in your project.'
        ]}
        fields={[
          <InputText
            key={'1'}
            label={'Twitch Channel'}
            error={getErrorFromField('youtubeUrl')}
            value={formik.values.youtubeUrl}
            placeholder={'https://www.twitch.tv/your-project-name'}
            icon={
              <LogoTwitch
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_TWITCH}
              />
            }
            onChangeText={youtubeUrl => changeValue('youtubeUrl', youtubeUrl)}
          />,
          <InputText
            key={'2'}
            label={'Youtube Channel'}
            error={getErrorFromField('youtubeUrl')}
            value={formik.values.youtubeUrl}
            placeholder={'https://www.youtube.com/user/your-project-name'}
            icon={
              <LogoYoutube
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_YOUTUBE}
              />
            }
            onChangeText={youtubeUrl => changeValue('youtubeUrl', youtubeUrl)}
          />
        ]}
      />
    </Collapsible>
  ), [formik.values.twitchUrl, formik.values.youtubeUrl, getErrorFromField]);

  const renderSocialNetworks = useMemo(() => (
    <Collapsible
      title={'Social Networks'}
      icon={(
        <ShareSocialOutline
          width={'22px'}
          height={'22px'}
          color={common.colors.PRIMARY}
        />
      )}
    >
      <FormColumn
        separator={false}
        title={'Social Networks'}
        paragraphs={[
          'Indicate in which social networks you or your project can be found. This will help you maximize your diffusion.',
          <Medium key={'1'}>The social networks you indicate will be shown in your project details.</Medium>
        ]}
        fields={[
          <InputText
            key={'1'}
            label={'Facebook Page'}
            error={getErrorFromField('facebookUrl')}
            value={formik.values.facebookUrl}
            placeholder={'https://www.facebook.com/your-project-name'}
            icon={
              <LogoFacebook
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_FACEBOOK}
              />
            }
            onChangeText={facebookUrl => changeValue('facebookUrl', facebookUrl)}
          />,
          <InputText
            key={'2'}
            label={'Twitter'}
            error={getErrorFromField('twitterUrl')}
            value={formik.values.twitterUrl}
            placeholder={'https://twitter.com/your-project-name'}
            icon={
              <LogoTwitter
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_TWITTER}
              />
            }
            onChangeText={twitterUrl => changeValue('twitterUrl', twitterUrl)}
          />,
          <InputText
            key={'3'}
            label={'Instagram'}
            error={getErrorFromField('instagramUrl')}
            value={formik.values.instagramUrl}
            placeholder={'https://www.instagram.com/your-project-name'}
            icon={
              <LogoInstagram
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_INSTAGRAM}
              />
            }
            onChangeText={instagramUrl => changeValue('instagramUrl', instagramUrl)}
          />,
          <InputText
            key={'4'}
            label={'Vkontakte'}
            error={getErrorFromField('vkUrl')}
            value={formik.values.vkUrl}
            placeholder={'https://vk.com/your-project-name'}
            icon={
              <LogoVk
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_VK}
              />
            }
            onChangeText={weChatUrl => changeValue('weChatUrl', weChatUrl)}
          />
        ]}
      />
    </Collapsible>
  ), [formik.values.facebookUrl, formik.values.twitterUrl, formik.values.instagramUrl, getErrorFromField]);

  const renderCommunities = useMemo(() => (
    <Collapsible
      title={'Communities'}
      icon={(
        <PeopleOutline
          width={'22px'}
          height={'22px'}
          color={common.colors.PRIMARY}
        />
      )}
    >
      <FormColumn
        separator={false}
        title={'Communities'}
        paragraphs={[
          'You can indicate invitation links to different communities to grow the internal community of your project.',
          <Medium key={'1'}>Users will have a direct way to access them from Blizzt. So we will try to maximize the diffusion reach to the users.</Medium>
        ]}
        fields={[
          <InputText
            key={'1'}
            label={'Discord Channel'}
            error={getErrorFromField('discordUrl')}
            value={formik.values.discordUrl}
            placeholder={'https://discord.com/invite/your-project-name'}
            icon={
              <LogoDiscord
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_DISCORD}
              />
            }
            onChangeText={discordUrl => changeValue('discordUrl', discordUrl)}
          />,
          <InputText
            key={'2'}
            label={'Reddit'}
            error={getErrorFromField('redditUrl')}
            value={formik.values.redditUrl}
            placeholder={'https://www.reddit.com/r/your-project-name'}
            icon={
              <LogoReddit
                width={'22px'}
                height={'22px'}
                color={common.colors.COLOR_REDDIT}
              />
            }
            onChangeText={redditUrl => changeValue('redditUrl', redditUrl)}
          />,
          <InputText
            key={'3'}
            label={'Telegram'}
            error={getErrorFromField('telegramUrl')}
            value={formik.values.telegramUrl}
            placeholder={'https://t.me/your-project-name'}
            icon={
              <BrandingIcon
                width={'22px'}
                height={'22px'}
                src={TelegramIcon}
              />
            }
            onChangeText={telegramUrl => changeValue('telegramUrl', telegramUrl)}
          />
        ]}
      />
    </Collapsible>
  ), [formik.values.discordUrl, formik.values.redditUrl, formik.values.telegramUrl, getErrorFromField]);

  return (
    <Layout onSubmit={formik.handleSubmit}>
      <Body>
        {renderMain}
        {renderPC}
        {renderConsole}
        {renderMobile}
        {renderChannels}
        {renderSocialNetworks}
        {renderCommunities}
      </Body>

      <FormFooter
        actions={[
          <Button
            ref={actionButtonRef}
            key={'save-changes'}
            type={isValidForm ? buttonTypesId.PRIMARY : buttonTypesId.DISABLED}
            caption={'Save Changes'}
            leftElement={(
              <SaveOutline
                width={'22px'}
                height={'22px'}
                color={common.colors.WHITE}
              />
            )}
            onClick={formik.handleSubmit}
          />
        ]}
      />
    </Layout>
  );
}

export default PromotionEditForm;
