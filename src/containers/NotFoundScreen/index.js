import * as React from 'react';
import { Link } from 'expo-router';

import { Image, Button } from 'react-native';

import Text from 'src/components/UIDisplay/Text';
import Container from 'src/components/Layout/Container';

const propTypes = {
};

const defaultProps = {
};

const NotFoundScreen = (props) => {
	return (
		<Container
			style={{
				justifyContent: 'center',
			}}
		>
			<Image
				style={{
					width: 225,
					marginBottom: 50,
					marginTop: 20,
					alignSelf: 'center',
				}}
				resizeMode="contain"
				source={require('./images/img.png')}
			/>
			<Text
				type="h1"
				style={{
					marginBottom: 5,
					textAlign: 'center',
				}}
			>
				Oops!
			</Text>
			<Text
				style={{
					marginBottom: 40,
					textAlign: 'center',
				}}
			>
				This screen doesn&apos;t exist.
			</Text>
			<Link href="/" asChild replace>
				<Button type="primary">Go to home screen!</Button>
			</Link>
		</Container>
	);
};

NotFoundScreen.propTypes = propTypes;

NotFoundScreen.defaultProps = defaultProps;

export default NotFoundScreen;
