import { View, Switch, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

type Props = {
  onToggleChange: (enabled: boolean) => void;
  initialValue?: boolean;
};

export default function SimpleBlackBarWithToggle({ onToggleChange, initialValue = false }: Props) {
  const [isEnabled, setIsEnabled] = useState(initialValue);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onToggleChange(newValue);
  };

  useEffect(() => {
    setIsEnabled(initialValue);
  }, [initialValue]);

  return (
    <View style={styles.bar}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Preto com 30% de opacidade
    width: "100%",
    alignItems: "center",
    padding: 12,
  },
});