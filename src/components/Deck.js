import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SWIPE_OUT_DURATION, SWIPE_THRESHOLD } from "../constant";

export default ({
  data,
  renderCard,
  onSwipeLeft,
  onSwipeRight,
  renderNoMoreCards,
}) => {
  const animation = useRef(new Animated.ValueXY()).current;
  const [currentItem, setCurrentItem] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, //anytime user press down on the screen, true  tells panResponder to react
      onPanResponderMove: (event, gesture) => {
        // We are setting the animation location according to the gesture movement
        animation.setValue({ x: gesture.dx, y: gesture.dy });
      }, //called when user click or drag
      onPanResponderRelease: (event, gesture) => {
        // when press or clicked or dragged screen is released by the user

        //Setting if liked or disliked
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction) => {
    const width = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(animation, {
      toValue: { x: width, y: 0 },
      duration: SWIPE_OUT_DURATION, // In ms, how long the animation takes to played
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = (direction) => {
    direction === "right"
      ? onSwipeRight(currentItem)
      : onSwipeLeft(currentItem);

    animation.setValue({ x: 0, y: 0 }); //resetting the position of new card
    setCurrentItem(currentItem + 1); // new card
  };

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
    if (currentItem >= data.length) {
      return renderNoMoreCards();
    }
    return data
      .map((item, index) => {
        if (index < currentItem) return null;
        if (index == currentItem) {
          <Animated.View
            key={item.id}
            style={[getCardStyle(), styles.cardStyle]}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>;
        }
        return (
          <View key={item.id} style={styles.cardStyle}>
            {renderCard(item)}
          </View>
        );
      })
      .reverse(); // To keep index 1 element at the top instead of last one
  };
  return <View>{renderCardList()}</View>;
};

Deck.defaultProps = {
  data: [], // Default value for data prop
  renderCard: (item) => null, // Default value for renderCard prop
  onSwipeLeft: (item) => null,
  onSwipeRight: (item) => null,
  renderNoMoreCards: () => null,
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH, // OR we can give left:0 and right:0 to stretch element to compkete width of screen
  },
});
