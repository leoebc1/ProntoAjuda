import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import SimpleBlackBarWithToggle from "@/components/SimpleBlackBarWithToggle";
import CardReceitas from "./CardReceita";

type Props = {
  onVoltar: () => void;
};

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export default function TelaReceita({ onVoltar }: Props) {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleToggleChange = (enabled: boolean) => {
    if (!enabled) {
      onVoltar();
    }
  };

function extrairIngredientes(meal: any) {
  const ingredientes: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingrediente = meal[`strIngredient${i}`];
    const medida = meal[`strMeasure${i}`];
    if (ingrediente && ingrediente.trim() !== "") {
      ingredientes.push(`${ingrediente} - ${medida}`);
    }
  }
  return ingredientes;
}

function traduzirTexto(texto: string) {
  return texto
    .replace(/chicken/gi, "frango")
    .replace(/salt/gi, "sal")
    .replace(/pepper/gi, "pimenta");
}

function traduzirReceita(meal: any) {
  return {
    id:meal.idMeal,
    nome: traduzirTexto(meal.strMeal),
    categoria: traduzirTexto(meal.strCategory),
    area: traduzirTexto(meal.strArea),
    instrucoes: traduzirTexto(meal.strInstructions),
    ingredientes: extrairIngredientes(meal).map(traduzirTexto),
    imagem: meal.strMealThumb,
  };
}

async function traduzirOnline(texto: string): Promise<string> {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`;
    const res = await fetch(url);
    const json = await res.json();

    let traduzido = json?.responseData?.translatedText || texto;
    traduzido = decodeURIComponent(traduzido); // 👈 remove %20, %0A etc

    return traduzido;
  } catch (error) {
    console.warn("Erro ao traduzir:", error);
    return texto;
  }
}


  useEffect(() => {
  /* async function fetchMeals() {
    try {
      const results = [];
      for (let i = 0; i < 6; i++) {
        const res = await fetch(`${BASE_URL}/random.php`);
        const json = await res.json();
        if (json.meals && json.meals[0]) {
          const receitaTraduzida = traduzirReceita(json.meals[0]);
          results.push(receitaTraduzida);
        }
      }
      setMeals(results);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setLoading(false);
    }
  } */
  async function fetchMeals() {
    try {
      const results = [];

      for (let i = 0; i < 6; i++) {
        const res = await fetch(`${BASE_URL}/random.php`);
        const json = await res.json();

        if (json.meals && json.meals[0]) {
          const meal = json.meals[0];

          // Traduções online
          const nome = await traduzirOnline(meal.strMeal);
          const categoria = await traduzirOnline(meal.strCategory);
          const area = await traduzirOnline(meal.strArea);
          const instrucoes = await traduzirOnline(meal.strInstructions);

          // Ingredientes
          const ingredientesOriginal = extrairIngredientes(meal);
          const ingredientesTraduzidos = await Promise.all(
            ingredientesOriginal.map((ing) => traduzirOnline(ing))
          );

          results.push({
            id: meal.idMeal,
            nome,
            categoria,
            area,
            instrucoes,
            ingredientes: ingredientesTraduzidos,
            imagem: meal.strMealThumb,
          });
        }
      }

      setMeals(results);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setLoading(false);
    }
  }
    fetchMeals();
}, []);


  const handleOpenRecipe = (meal: any) => {
    //Alert.alert("Receita selecionada", `Você abriu: ${meal.strMeal}`);
    Alert.alert("Receita selecionada", `Você abriu: ${meal.nome}`);
  };

  const handleEmergencyTrigger = (meal: any) => {
    // aqui vai lógica de alerta disfarçado
    Alert.alert("Receita salva", "Receita adicionada aos favoritos!");
  
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>🍳 Receitas em destaque</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 30 }} />
        ) : (
          <FlatList
            data={meals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardReceitas
                meal={item}
                onPress={handleOpenRecipe}
                onEmergencyTrigger={handleEmergencyTrigger}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>

      <SimpleBlackBarWithToggle
        initialValue={true}
        onToggleChange={handleToggleChange}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginVertical: 16,
  },
});