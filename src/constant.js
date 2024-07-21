import { Dimensions } from "react-native";
export const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://images.unsplash.com/photo-1493244040629-496f6d136cc9",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "https://images.unsplash.com/photo-1534081333815-ae5019106622",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "https://images.unsplash.com/photo-1512356166546-a12d78c4e0a1",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
  },
  {
    id: 9,
    text: "Card #9",
    uri: "https://images.unsplash.com/photo-1504203702612-66953f4f1392",
  },
  {
    id: 10,
    text: "Card #10",
    uri: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  },
];

export const SCREEN_WIDTH = Dimensions.get("window").width; //The device screen width with application, to handle rotation depending on different screen size

//setting minimum amount of distance to be swiped to be liked or disliked
export const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

export const SWIPE_OUT_DURATION = 250;
