import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Image,  } from "react-native";


import SimpleBlackBarWithToggle from "@/components/SimpleBlackBarWithToggle";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
      </View>
      <SimpleBlackBarWithToggle/>
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
});
