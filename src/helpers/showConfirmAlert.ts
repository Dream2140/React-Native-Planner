import { Alert } from "react-native";

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface ConfirmationAlertProps {
  title: string;
  message: string;
  okHandler: () => void;
  cancelHandler?: () => void;
}

export const showConfirmAlert = ({
                                 title,
                                 message,
                                 okHandler,
                                 cancelHandler,
                               }: ConfirmationAlertProps): void => {
  const buttons: AlertButton[] = [
    {
      text: 'Cancel',
      style: 'cancel',
      onPress: () => {
        if (cancelHandler) {
          cancelHandler();
        }
      },
    },
    {
      text: 'OK',
      onPress: () => {
        if (okHandler) {
          okHandler();
        }
      },
    },
  ];

  Alert.alert(title, message, buttons, { cancelable: false });
};
