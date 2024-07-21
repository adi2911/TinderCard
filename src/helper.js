import { Text } from "react-native";
import { Button, Card } from "react-native-elements";

export const renderCard = (item) => {
  return (
    <Card key={item.id}>
      <Card.Title>{item.text}</Card.Title>
      <Card.Image source={{ uri: item.uri }} />
      <Text style={{ marginBottom: 10 }}>I can customize the card further</Text>
      <Button
        icon={{ name: "code" }}
        backgroundColor="#03A9F4"
        title="View Now"
      />
    </Card>
  );
};

export const onSwipeRight = (item) => {};

export const onSwipeLeft = (item) => {};
