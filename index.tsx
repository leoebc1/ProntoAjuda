import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Image, Alert } from "react-native";
import { useState } from "react";

import SimpleBlackBarWithToggle from "@/components/SimpleBlackBarWithToggle";
import HelpButton from "@/components/HelpButton";

export default function HomeScreen() {
  const [isToggleEnabled, setIsToggleEnabled] = useState<boolean>(false);

  const handleToggleChange = (isEnabled: boolean): void => {
    setIsToggleEnabled(isEnabled)
  }

  const handleHelpPress = (): void => {
    Alert.alert("Ajuda", "Sua solicitação de ajuda foi enviada!");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

      </View>

      {!isToggleEnabled && (
        <View style={styles.buttonContainer}>
          <HelpButton onPress={handleHelpPress} />
        </View>)}
      <SimpleBlackBarWithToggle onToggleChange={handleToggleChange} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                        // Ocupar toda a tela
    justifyContent: "center",       // Centralizar verticalmente
    alignItems: "center",           // Centralizar horizontalmente
    backgroundColor: "#00674F",     // Fundo branco (padrão)
    padding: 16,                    // Espaçamento interno
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#00674F", // fundo geral
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,              // Espaço entre botão e barra preta
  },
});
