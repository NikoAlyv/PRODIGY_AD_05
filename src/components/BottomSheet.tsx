import React, {ReactNode, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {normalize} from 'theme/metrics';
import {CommonStyles} from 'theme/common.styles';

interface IBottomSheet {
  setStatus?: any;
  style?: StyleProp<ViewStyle>;
  Children?: ReactNode;
  buttonText: string;
  title: string;
  onPress?: () => void;
  size?: StyleProp<ViewStyle>;
}

export const BottomSheet: React.FC<IBottomSheet> = ({
  setStatus,
  style,
  Children,
  size,
  buttonText,
  title,
  onPress,
}) => {
  const slide = React.useRef(new Animated.Value(300)).current;
  const lastOffset = React.useRef(0);
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: slide}}],
    {useNativeDriver: true},
  );

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      lastOffset.current = 0;
      slide.setOffset(lastOffset.current);
      slide.setValue(0);
    });
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 300,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      lastOffset.current = 300;
      slide.setOffset(lastOffset.current);
      slide.setValue(0);
    });
  };

  useEffect(() => {
    slideUp();
  }, []);

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      setStatus(false);
    }, 800);
  };

  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={[styles.size, size]}>
        <GestureHandlerRootView>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={event => {
              if (event.nativeEvent.oldState === 4) {
                lastOffset.current += event.nativeEvent.translationY;
                if (lastOffset.current >= 300) {
                  closeModal();
                } else {
                  slideUp();
                }
              }
            }}>
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  transform: [
                    {translateY: Animated.add(slide, lastOffset.current)},
                  ],
                },
                style,
              ]}>
              <View style={[styles.handle, CommonStyles.alginSelfCenter]} />
              <Text style={styles.title}>{title}</Text>
              <Pressable style={styles.button} onPress={onPress}>
                <Text> {buttonText}</Text>
              </Pressable>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  handle: {
    backgroundColor: '#d3d3d3',
    width: 48,
    height: 5,
    marginVertical: normalize('vertical', 8),
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#10d635',
    alignItems: 'center',
    paddingVertical: normalize('vertical', 10),
  },
  backdrop: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  size: {
    width: '100%',
    height: '15%',
  },
  bottomSheet: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: normalize('horizontal', 24),
  },
  title: {
    backgroundColor: '#d3d3d3',
    borderRadius: 50,
    padding: 10,
    marginVertical: normalize('vertical', 10),
  },
  foot: {marginTop: 20},
});
