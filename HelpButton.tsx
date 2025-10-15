// HelpButton.tsx
import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  GestureResponderEvent 
} from 'react-native';

interface HelpButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const HelpButton: React.FC<HelpButtonProps> = ({
  onPress,
  disabled = false
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>Chamar Ajuda</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#dc2626',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HelpButton;