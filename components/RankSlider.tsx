import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions, Pressable } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated';
import { useThemeColor } from './themed/useThemeColor';
import { Text } from './Themed';
import { RankType, Ranks } from '../assets/data/types';
import { scheduleOnRN } from 'react-native-worklets';

interface RankSliderProps {
  value: RankType;
  onValueChange: (value: RankType) => void;
  containerStyle?: any;
}

const THUMB_SIZE = 32;
const TRACK_HEIGHT = 8;
const SEGMENTS = Ranks.length;

export const RankSlider: React.FC<RankSliderProps> = ({
  value,
  onValueChange,
  containerStyle,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const PADDING = 40;
  const SLIDER_WIDTH = screenWidth - PADDING * 2;
  const SEGMENT_WIDTH = SLIDER_WIDTH / (SEGMENTS - 1);

  const accentColor = useThemeColor({}, 'accent');
  const textColor = useThemeColor({}, 'text');
  const trackBg = useThemeColor({ light: '#DDD', dark: '#222' }, 'card');
  const borderColor = useThemeColor({}, 'cardBorder');

  const currentIndex = Ranks.indexOf(value);
  const translateX = useSharedValue(currentIndex * SEGMENT_WIDTH);
  const isPressed = useSharedValue(false);
  const startX = useSharedValue(0);

  useEffect(() => {
    const targetX = Ranks.indexOf(value) * SEGMENT_WIDTH;
    translateX.value = withTiming(targetX);
  }, [value, SEGMENT_WIDTH]);

  const snapToIndex = (x: number) => {
    'worklet';
    const index = Math.round(x / SEGMENT_WIDTH);
    return Math.min(Math.max(index, 0), SEGMENTS - 1);
  };

  useAnimatedReaction(
    () => snapToIndex(translateX.value),
    (nextIndex, prevIndex) => {
      if (nextIndex !== prevIndex && isPressed.value) {
        scheduleOnRN(onValueChange,Ranks[nextIndex]);
      }
    }
  );

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      const nextX = startX.value + event.translationX;
      translateX.value = Math.min(Math.max(nextX, 0), SLIDER_WIDTH);
    })
    .onEnd(() => {
      isPressed.value = false;
      const finalIndex = snapToIndex(translateX.value);
      translateX.value = withTiming(finalIndex * SEGMENT_WIDTH);
      scheduleOnRN(onValueChange,Ranks[finalIndex]);
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value - THUMB_SIZE / 2 },
      { scale: withTiming(isPressed.value ? 1.2 : 1) },
    ],
    backgroundColor: textColor,
    borderColor: accentColor,
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: translateX.value,
    backgroundColor: accentColor,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.trackWrapper, { width: SLIDER_WIDTH }]}>
        {/* Track Background */}
        <View style={[styles.track, { backgroundColor: trackBg, borderColor }]}>
          <Animated.View style={[styles.progress, progressStyle]} />
        </View>

        {/* Discrete Markers */}
        {Ranks.map((rank, index) => {
          const markerX = index * SEGMENT_WIDTH;
          return (
            <Pressable 
              key={rank} 
              style={[styles.markerWrapper, { left: markerX - 20 }]}
              onPress={() => onValueChange(rank)}
            >
              <View style={[styles.marker, { backgroundColor: currentIndex >= index ? accentColor : borderColor }]} />
              <Text 
                style={[
                  styles.rankLabel, 
                  { 
                    color: currentIndex === index ? accentColor : textColor,
                    fontWeight: currentIndex === index ? 'bold' : 'normal',
                    opacity: currentIndex === index ? 1 : 0.5
                  }
                ]}
              >
                {rank.split(' ')[0]}
              </Text>
            </Pressable>
          );
        })}

        {/* Interactive Thumb */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.thumb, thumbStyle, { shadowColor: accentColor }]} />
        </GestureDetector>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  trackWrapper: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    width: '100%',
    overflow: 'hidden',
    borderWidth: 1,
  },
  progress: {
    height: '100%',
  },
  markerWrapper: {
    position: 'absolute',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 28, // Position above track
  },
  rankLabel: {
    position: 'absolute',
    top: 22,
    fontSize: 11,
    width: 80,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    top: -THUMB_SIZE/2-5,
    borderWidth: 4,
    borderColor: '#FFF',
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    zIndex: 10,
  },
});
