import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const { width } = Dimensions.get('window');

type OnboardingSlide = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Find Your Next Opportunity',
    description: 'Connect with like-minded professionals and discover exciting opportunities in tech.',
    image: 'opportunity'
  },
  {
    id: '2',
    title: 'Build Your Dream Team',
    description: 'Find co-founders, collaborators, and team members who share your vision.',
    image: 'team'
  },
  {
    id: '3',
    title: 'Ship Great Products',
    description: 'Turn your ideas into reality with the right team and resources.',
    image: 'product'
  }
];

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = (index: number) => {
    if (slidesRef.current) {
      slidesRef.current.scrollToIndex({ index });
    }
  };

  const Paginator = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp'
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.slidesContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={styles.imageContainer}>
                {/* Placeholder for images */}
                <View style={styles.imagePlaceholder} />
              </View>
              <ThemedText type="title" style={styles.title}>{item.title}</ThemedText>
              <ThemedText style={styles.description}>{item.description}</ThemedText>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View style={styles.footer}>
        <Paginator />
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            if (currentIndex === slides.length - 1) {
              onComplete();
            } else {
              scrollTo(currentIndex + 1);
            }
          }}
        >
          <ThemedText style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  slidesContainer: {
    flex: 1
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    padding: 32
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: 'center'
  },
  imagePlaceholder: {
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#EBEBEB',
    borderRadius: 20
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 24
  },
  footer: {
    padding: 32
  },
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
    marginHorizontal: 4
  },
  button: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 30,
    marginTop: 16
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
});