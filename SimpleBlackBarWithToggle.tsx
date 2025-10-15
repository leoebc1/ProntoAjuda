import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch } from 'react-native';

interface SimpleBlackBarWithToggleProps {
  onToggleChange?: (isEnabled: boolean) => void;  // 👈 AQUI - o walkie-talkie
}

const SimpleBlackBarWithToggle: React.FC<SimpleBlackBarWithToggleProps> = ({
  onToggleChange
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const toggleSwitch = (): void => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onToggleChange?.(newValue);
  }

  return (
    <View style={styles.blackBar}>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blackBar: {
    width: '100%',
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SimpleBlackBarWithToggle;