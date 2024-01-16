import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Welcome: undefined;
    Register: undefined;
    Login: undefined;
};

export type WelcomeNavigationProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type RegistrationNavigationProps = NativeStackScreenProps<RootStackParamList, 'Register'>;