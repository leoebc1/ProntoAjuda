/* import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Receita } from "@/utils/types";

type Props = {
  meal: Receita;
  onPress?: (meal: Receita) => void;
  onEmergencyTrigger?: (meal: Receita) => void;
};

export default function CardReceitas({
  meal,
  onPress,
  onEmergencyTrigger,
}: Props) {
  const handleLongPress = () => {
    onEmergencyTrigger?.(meal);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(meal)}>
      <TouchableWithoutFeedback onLongPress={handleLongPress}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.thumb} />
      </TouchableWithoutFeedback>

      <View style={styles.info}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.category}>
          {meal.strCategory} • {meal.strArea}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 2,
  },
  thumb: {
    width: "100%",
    height: 160,
    backgroundColor: "#eee",
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  category: {
    color: "#666",
    marginTop: 4,
  },
});
 */



import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Receita } from "@/utils/types";

type Props = {
  meal: Receita;
  onPress?: (meal: Receita) => void;
  onEmergencyTrigger?: (meal: Receita) => void;
};

export default function CardReceitas({
  meal,
  onPress,
  onEmergencyTrigger,
}: Props) {
  const handleLongPress = () => {
    onEmergencyTrigger?.(meal);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(meal)}>
      <TouchableWithoutFeedback onLongPress={handleLongPress}>
        <Image source={{ uri: meal.imagem }} style={styles.thumb} />
      </TouchableWithoutFeedback>

      <View style={styles.info}>
        <Text style={styles.title}>{meal.nome}</Text>
        <Text style={styles.category}>
          {meal.categoria} • {meal.area}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 2,
  },
  thumb: {
    width: "100%",
    height: 160,
    backgroundColor: "#eee",
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  category: {
    color: "#666",
    marginTop: 4,
  },
});