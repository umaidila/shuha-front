// Alert.web.ts
import { Alert, AlertButton, Platform } from 'react-native';

const alertPolyfill = (title: string, message?: string, buttons?: AlertButton[]) => {
    
    if (buttons === undefined || buttons.length === 0) {
        window.alert([title, message].filter(Boolean).join('\n'));
        return;
      }
  
      const result = window.confirm([title, message].filter(Boolean).join('\n'));
  
      if (result === true) {
        const confirm = buttons.find(({ style }) => style !== 'cancel');
        confirm?.onPress?.();
        return;
      }
  
      const cancel = buttons.find(({ style }) => style === 'cancel');
      cancel?.onPress?.();
}


const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert

export default alert