// Dependencies
import React, { useMemo } from 'react';

// Styled Components
import {
  Layout,
  NetworkInfo,
  Title,
  Paragraph,

  styles
} from './styles';

import { common } from '@styled-components/common';

// Types
import { chainsNetworkName, chainsTypeId, networkType, networkTypes } from '@types/web3';

// Assets
import {
  WifiOutline,
  WarningOutline
} from 'react-ionicons';

// Components
import MainTooltip from '../../tooltips/MainTooltip';

function mainnetContent(chainId) {
  return {
    title: `You are connected to the ${chainsNetworkName[chainId]} mainnet`,
    paragraph: ['Right now you are looking at production version.', 'This means that every transaction you make is subject to the Ethereum network, so every transaction you make will be real.', 'If you want to use Blizzt in a test environment, you can change the network from your wallet provider.']
  };
}

function testnetContent(chainId) {
  return {
    title: `You are connected to the ${chainsNetworkName[chainId]} testnet`,
    paragraph: [`You are currently connected to the ${chainsNetworkName[chainId]} test network.`, 'Please note that all operations you perform on this network are for testing purposes only and will have no effect on the Ethereum network.', 'To change it, go to your wallet provider and change the network from there.']
  };
}

function unsupportedContent(chainId) {
  return {
    title: `Network not supported: ${chainsNetworkName[chainId]}`,
    paragraph: ['This network is not supported', 'Please, use Metamask to connect to another network.']
  };
}

function NetworkIndicator({ chainId = chainsTypeId.ETH }) {
  const chainType = networkType[chainId];
  const renderNetworkInformation = useMemo(() => {
    let content = {};
    if (chainType === networkTypes.MAINNET) content = mainnetContent(chainId);
    else if (chainType === networkTypes.TESTNET) content = testnetContent(chainId);
    else if (chainType === networkTypes.UNSUPPORTED) content = unsupportedContent(chainId);

    return (
			<NetworkInfo>
				<Title chainType={chainType}>{content.title}</Title>
				{content.paragraph.map((paragraph, index) => (
					<Paragraph key={`--paragraph-item-${index.toString()}`}>{paragraph}</Paragraph>
				))}
			</NetworkInfo>
    );
  }, [chainType]);

  return (
		<MainTooltip
			component={renderNetworkInformation}
			customContainerStyle={styles.tooltipContainer}
			customArrowStyle={styles.tooltipArrow}
		>
			<Layout chainType={chainType}>
				{chainType === networkTypes.UNSUPPORTED ? (
					<WarningOutline
						width={'22px'}
						height={'22px'}
						color={common.colors.RED}
					/>
				) : chainType === networkTypes.TESTNET ? (
					<WifiOutline
						width={'22px'}
						height={'22px'}
						color={common.colors.YELLOW}
					/>
				) : (
					<WifiOutline
					width={'22px'}
					height={'22px'}
					color={common.colors.GREEN}
				/>
				)}
			</Layout>
		</MainTooltip>
  );
}

export default NetworkIndicator;
