import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity } from 'react-native';

import { actionSignUp } from 'src/redux/actions/auth';

import Text from 'src/components/UIDisplay/Text';
import View from 'src/components/UIDisplay/View';
import Container from 'src/components/Layout/Container';
import Logo from 'src/components/Layout/Logo';
import Form from 'src/components/UIControls/Form';
import InputText from 'src/components/UIControls/InputText';
import InputPassword from 'src/components/UIControls/InputPassword';

import { useRouter, Link } from 'expo-router';

const propTypes = {};

const defaultProps = {};

const SignUpScreen = (props) => {
	const [loading, setLoading] = React.useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const inputPass = React.useRef();
	const [form] = Form.useForm();

	const handleSubmitFrom = React.useCallback(async (values) => {
		try {
			setLoading(true);
			await dispatch(await actionSignUp(values));
			router.replace('/');
		// eslint-disable-next-line no-empty
		} catch (error) {
		} finally {
			setLoading(false);
		}
	}, [dispatch, router]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{
				flex: 1,
			}}
		>
			<Container
				headerShown
				headerTransparent
				loading={loading}
				showIndicator={false}
			>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						marginTop: 20,
					}}
				>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							marginTop: 20,
						}}
					>
						<Logo size={100} />
					</View>
					<Form
						form={form}
						onFinish={handleSubmitFrom}
					>
						<Form.Field
							name="email"
							rules={[
								{
									type: 'email',
									message: 'Invalid email',
								},
								{
									required: true,
									whitespace: false,
									message: 'Required Information',
								},
							]}
							style={{
								marginBottom: 20,
							}}
						>
							<InputText
								placeholder="Email"
								type="email"
								autoCapitalize="none"
								blurOnSubmit={false}
								onSubmitEditing={() => { inputPass?.current?.focus(); }}
							/>
						</Form.Field>
						<Form.Field
							name="fullName"
							rules={[
								{
									required: true,
									whitespace: false,
									message: 'Required Information',
								},
							]}
							style={{
								marginBottom: 20,
							}}
						>
							<InputText
								placeholder="Full Name"
								type="text"
								autoCapitalize="none"
								blurOnSubmit={false}
								onSubmitEditing={() => { inputPass?.current?.focus(); }}
							/>
						</Form.Field>
						<Form.Field
							name="password"
							rules={[
								{
									required: true,
									message: 'Required Information',
								},
							]}
							style={{
								marginBottom: 10,
							}}
						>
							<InputPassword
								ref={inputPass}
								placeholder="Password"
								secureTextEntry
								returnKeyType="go"
								onSubmitEditing={form.submit}
							/>
						</Form.Field>
						<View
							style={{
								marginTop: 20,
							}}
						>
							<SafeAreaView
								style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
							>
								<TouchableOpacity
									onPress={form.submit}
									style={{ backgroundColor: '#00953B', padding: 15, borderRadius: 4, width: '90%' }}
								>
									<Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
										Sign Up
									</Text>
								</TouchableOpacity>
							</SafeAreaView>
							<Link href="/login" asChild replace>
								<Text
									style={{
										textAlign: 'center',
										marginTop: 20,
									}}
									type="link"
								>
									Login
								</Text>
							</Link>
						</View>
					</Form>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'flex-end',
					}}
				>
					<Text
						style={{
							marginTop: 30,
							marginBottom: 0,
							textAlign: 'center',
						}}
						type="note"
					>
						2023
					</Text>
				</View>
			</Container>
		</KeyboardAvoidingView>
	);
};

SignUpScreen.propTypes = propTypes;

SignUpScreen.defaultProps = defaultProps;

export default SignUpScreen;
