import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const wellnessTips = [
    "Start your day with a glass of warm lemon water to boost your metabolism and support digestion. This simple habit can help detoxify your body and provide vitamin C.",
    "Take a 10-minute walk after each meal to aid digestion and regulate blood sugar levels.",
    "Practice deep breathing exercises for 5 minutes daily to reduce stress and improve mental clarity.",
    "Include colorful vegetables in every meal to ensure you get a variety of essential nutrients.",
    "Stay hydrated by drinking at least 8 glasses of water throughout the day."
  ];

  const healthBites = [
    { text: "Eating a handful of almonds daily can help reduce bad cholesterol levels and provide healthy fats that support brain function.", highlight: "Did you know?" },
    { text: "Green tea contains antioxidants called catechins that may help boost metabolism and protect against heart disease.", highlight: "Health Fact:" },
    { text: "Berries are packed with anthocyanins, powerful compounds that help improve memory and cognitive function.", highlight: "Nutrition Tip:" },
    { text: "Dark leafy greens like spinach and kale are rich in nitrates, which can help improve blood flow and exercise performance.", highlight: "Fun Fact:" }
  ];

  const currentTip = wellnessTips[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % wellnessTips.length];
  const currentBite = healthBites[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % healthBites.length];

  const nutritionImages = [
    {
      uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Blueberries",
      description: "Rich in antioxidants and support brain health"
    },
    {
      uri: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Spinach",
      description: "Packed with iron and folate for energy"
    },
    {
      uri: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Avocados",
      description: "Healthy fats that support heart health"
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>Welcome to Wellness</Text>
        <Text style={styles.welcomeSubtitle}>Your journey to a healthier lifestyle starts here</Text>
      </View>

      <View style={styles.tipCard}>
        <View style={styles.tipHeader}>
          <View style={styles.iconContainer}>
            <Ionicons name="bulb" size={20} color="white" />
          </View>
          <Text style={styles.tipTitle}>Daily Wellness Tip</Text>
        </View>
        <Text style={styles.tipText}>{currentTip}</Text>
      </View>

      <View style={styles.healthBiteCard}>
        <View style={styles.tipHeader}>
          <View style={[styles.iconContainer, { backgroundColor: '#fb923c' }]}>
            <Ionicons name="nutrition" size={20} color="white" />
          </View>
          <Text style={styles.tipTitle}>Health Bite</Text>
        </View>
        <Text style={styles.tipText}>
          <Text style={styles.highlight}>{currentBite.highlight}</Text> {currentBite.text}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nature's Powerhouses</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
          {nutritionImages.map((item, index) => (
            <View key={index} style={styles.imageCard}>
              <Image source={{ uri: item.uri }} style={styles.nutritionImage} />
              <View style={styles.imageOverlay}>
                <Text style={styles.imageTitle}>{item.title}</Text>
                <Text style={styles.imageDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  tipCard: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  healthBiteCard: {
    backgroundColor: '#fed7aa',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    padding: 24,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#4ade80',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  tipText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  highlight: {
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  imageScroll: {
    paddingLeft: 24,
  },
  imageCard: {
    width: width * 0.8,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  nutritionImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  imageTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  imageDescription: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
});