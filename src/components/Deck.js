import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width; //The device screen width with application, to handle rotation depending on different screen size

export default ({ data, renderCard }) => {
  const animation = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, //anytime user press down on the screen, true  tells panResponder to react
      onPanResponderMove: (event, gesture) => {
        // We are setting the animation location according to the gesture movement
        animation.setValue({ x: gesture.dx, y: gesture.dy });
      }, //called when user click or drag
      onPanResponderRelease: () => {
        // when press or clicked or dragged screen is released by the user
        resetPosition();
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(animation, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const getCardStyle = () => {
    //binding a relation between dx and rotate property, this is does by adding a interpolate property sort of linear relation
    const rotate = animation.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5], // on what of input x what will be output rotated degree.
      outputRange: ["-120deg", "0deg", "120deg"], //how rotate behaves on input range
    });

    return {
      ...animation.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCardList = () => {
    return data.map((item, index) => {
      if (index == 0) {
        <Animated.View
          key={item.id}
          style={getCardStyle}
          {...panResponder.panHandlers}
        >
          {renderCard(item)}
        </Animated.View>;
      }
      return renderCard(item);
    });
  };
  return <View>{renderCardList()}</View>;
};

const styles = StyleSheet.create({});
