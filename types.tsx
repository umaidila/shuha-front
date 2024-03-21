import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
    Welcome: undefined;
    Register: undefined;
    Login: { email: string, password: string } | undefined;
    Lobby: undefined;
};

export type WelcomeNavigationProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type RegistrationNavigationProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type LoginNavigationProps = NativeStackScreenProps<RootStackParamList, 'Login'>;