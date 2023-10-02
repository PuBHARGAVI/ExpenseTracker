import {Overlay} from 'react-native-elements';
import {Text, View} from 'react-native';
import {theme} from '../Theme';

export const MessageOverlay = props => {
  return (
    <Overlay
      isVisible={props.isVisible}
      overlayStyle={theme.styles.overlay}
      onBackdropPress={props.onDismiss()}>
      <Text style={theme.styles.overlayText}>{props.message}</Text>
      {props.budgetExceededInfo && (
        <View style={theme.styles.warningContainer}>
          <Text style={theme.styles.warningLabel}>Warning:</Text>
          <Text style={theme.styles.warningText}>
            {props.budgetExceededInfo}
          </Text>
        </View>
      )}
    </Overlay>
  );
};
