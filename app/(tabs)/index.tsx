import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Image, Modal, Animated, Keyboard, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
type Opportunity = {
  id: string;
  title: string;
  description: string;
  domain: string;
  type: 'job' | 'collaboration';
  postedBy: string;
  postedAt: string;
};

const dummyOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Looking for Technical Co-Founder',
    description: 'Seeking a passionate developer to build a revolutionary AI platform. Experience with machine learning and cloud infrastructure required.',
    domain: 'Technology',
    type: 'collaboration',
    postedBy: 'Sarah Chen',
    postedAt: '2 hours ago'
  },
  {
    id: '2',
    title: 'CTO Position - Fintech Startup',
    description: 'Early-stage fintech startup looking for a CTO. Must have experience in blockchain and financial systems.',
    domain: 'Finance',
    type: 'job',
    postedBy: 'Michael Ross',
    postedAt: '1 day ago'
  },
  {
    id: '1',
    title: 'Looking for Technical Co-Founder',
    description: 'Seeking a passionate developer to build a revolutionary AI platform. Experience with machine learning and cloud infrastructure required.',
    domain: 'Technology',
    type: 'collaboration',
    postedBy: 'Sarah Chen',
    postedAt: '2 hours ago'
  },
  {
    id: '2',
    title: 'CTO Position - Fintech Startup',
    description: 'Early-stage fintech startup looking for a CTO. Must have experience in blockchain and financial systems.',
    domain: 'Finance',
    type: 'job',
    postedBy: 'Michael Ross',
    postedAt: '1 day ago'
  },
  {
    id: '1',
    title: 'Looking for Technical Co-Founder',
    description: 'Seeking a passionate developer to build a revolutionary AI platform. Experience with machine learning and cloud infrastructure required.',
    domain: 'Technology',
    type: 'collaboration',
    postedBy: 'Sarah Chen',
    postedAt: '2 hours ago'
  },
  {
    id: '2',
    title: 'CTO Position - Fintech Startup',
    description: 'Early-stage fintech startup looking for a CTO. Must have experience in blockchain and financial systems.',
    domain: 'Finance',
    type: 'job',
    postedBy: 'Michael Ross',
    postedAt: '1 day ago'
  },
  {
    id: '1',
    title: 'Looking for Technical Co-Founder',
    description: 'Seeking a passionate developer to build a revolutionary AI platform. Experience with machine learning and cloud infrastructure required.',
    domain: 'Technology',
    type: 'collaboration',
    postedBy: 'Sarah Chen',
    postedAt: '2 hours ago'
  },
];

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const router = useRouter();

  const handleCardPress = () => {
    router.push(`/post-detail?id=${opportunity.id}`);
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <ThemedView style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.authorContainer}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }} 
              style={styles.authorAvatar} 
            />
            <View style={styles.authorInfo}>
              <ThemedText type="subtitle" style={{ color: '#000000' }}>{opportunity.title}</ThemedText>
              <View style={styles.postedInfo}>
                <ThemedText style={styles.postedBy}>{opportunity.postedBy}</ThemedText>
                <ThemedText style={styles.postedAt}>{opportunity.postedAt}</ThemedText>
              </View>
            </View>
          </View>
        </View>
        <ThemedText style={styles.description} numberOfLines={2}>
          {opportunity.description}
        </ThemedText>
        <View style={styles.tagsContainer}>
          <View style={styles.hashtagContainer}>
            <ThemedText style={styles.hashtagText}>#{opportunity.type}</ThemedText>
          </View>
          <View style={styles.hashtagContainer}>
            <ThemedText style={styles.hashtagText}>#{opportunity.domain.toLowerCase()}</ThemedText>
          </View>
        </View>
        <View style={styles.engagementContainer}>
          <TouchableOpacity style={styles.engagementButton}>
            <IconSymbol name="heart" size={24} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.engagementButton} onPress={handleCardPress}>
            <IconSymbol name="bubble.left" size={24} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.engagementButton}>
            <IconSymbol name="bookmark" size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  commentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    color: '#000000',
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendButton: {
    marginLeft: 8,
    padding: 4,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  header: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    marginTop: 12,
    borderRadius: 50,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  searchIcon: {
    marginRight: 8,
    marginLeft: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap:3,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  searchIcon: {
    marginRight: 8,
    marginLeft: 16,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  feed: {
    flex: 1,
    paddingBottom: Platform.select({
      ios: 160,
      android: 160,
      default: 100
    }), // Add padding to account for the floating action button and tab bar
  },
  card: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#EBEBEB',
  },
  cardHeader: {
    marginBottom: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.8,
    color: '#000000',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  hashtagContainer: {
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  hashtagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  postedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postedBy: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
  },
  postedAt: {
    fontSize: 12,
    opacity: 0.6,
    color: '#000000',
  },
  engagementContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)'
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4
  },
  engagementText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#666666'
  }
});
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <ThemedText type="title" style={styles.appName}>Found.</ThemedText>
          <TouchableOpacity>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }} 
              style={styles.profileIcon} 
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.searchContainer, { backgroundColor: '#FFFFFF' }]}>
          <View style={styles.searchIcon}>
            <IconSymbol
              name="magnifyingglass"
              size={24}
              color="#000000"
            />
          </View>
          <TextInput
            placeholder="Search . . ."
            placeholderTextColor="#999999"
            style={styles.searchInput}
          />
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterChip, { backgroundColor: '#000000' }]}>
            <ThemedText style={[styles.filterText, { color: '#FFFFFF' }]}>All</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterChip, { backgroundColor: '#F5F5F5' }]}>
            <ThemedText style={[styles.filterText, { color: '#000000' }]}>Latest</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterChip, { backgroundColor: '#F5F5F5' }]}>
            <ThemedText style={[styles.filterText, { color: '#000000' }]}>Trending</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.feed}>
        {dummyOpportunities.map(opportunity => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}