import {Overlay} from 'react-native-elements';
import {Text} from 'react-native';
import {theme} from '../Theme';

export const MessageOverlay = props => {
  return (
    <Overlay
      isVisible={props.isVisible}
      overlayStyle={theme.styles.overlay}
      onBackdropPress={props.onDismiss()}>
      <Text style={theme.styles.overlayText}>{props.message}</Text>
    </Overlay>
  );
};
