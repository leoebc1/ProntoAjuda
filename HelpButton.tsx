import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

interface HelpButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const HelpButton: React.FC<HelpButtonProps> = ({
  onPress,
  disabled = false,
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
    width: "100%",
    height: 56,
    backgroundColor: "#686464ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 20,

    // Sombra moderna
    shadowColor: "#000000ff",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 12,

    // Efeito de brilho interno
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },

  buttonDisabled: {
    backgroundColor: "#9ca3af", // Cinza neutro para estado desativado
    shadowColor: "#6b7280",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  buttonPressed: {
    backgroundColor: "#b91c1c", // Vermelho mais escuro quando pressionado
    shadowColor: "#dc2626",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    transform: [{ scale: 0.98 }], // Pequeno feedback tátil
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: "System",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  buttonTextDisabled: {
    color: "#e5e7eb", // Cinza claro para texto desativado
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    opacity: 0.8,
  },
});

export default HelpButton;
