import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch } from 'react-native';

const SimpleBlackBarWithToggle: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const toggleSwitch = (): void => setIsEnabled(previousState => !previousState);

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