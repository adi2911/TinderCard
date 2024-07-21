import { StyleSheet, View } from "react-native";
import Deck from "./src/components/Deck";
import { DATA } from "./src/constant";
import {
  onSwipeLeft,
  onSwipeRight,
  renderCard,
  renderNoMoreCards,
} from "./src/helper";

export default function App() {
  return (
    <View style={styles.container}>
      <Deck
        data={DATA}
        renderCard={renderCard}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
