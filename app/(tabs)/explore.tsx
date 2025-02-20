import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

type UserProfile = {
  id: string;
  name: string;
  role: string;
  domain: string;
  skills: string[];
  interests: string[];
  avatar: string;
  location: string;
};

const DOMAINS = [
  'Technology & Engineering',
  'Business Development & Strategy',
  'Marketing & Sales',
  'Finance & Accounting',
  'Design & UI/UX',
  'Product Management',
  'Operations & Human Resources',
  'Legal & Compliance',
  'Data Analytics & Business Intelligence'
];

const dummyProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'David Kim',
    role: 'Software Engineer',
    domain: 'Technology & Engineering',
    skills: ['React Native', 'Node.js', 'AWS'],
    interests: ['AI/ML', 'Mobile Development', 'Cloud Architecture'],
    avatar: 'https://i.pravatar.cc/150?img=4',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'Rachel Chen',
    role: 'Product Manager',
    domain: 'Product Management',
    skills: ['Product Strategy', 'UX Design', 'Agile'],
    interests: ['User Research', 'Market Analysis', 'Team Leadership'],
    avatar: 'https://i.pravatar.cc/150?img=5',
    location: 'New York, NY'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'UX Designer',
    domain: 'Design & UI/UX',
    skills: ['Figma', 'User Research', 'Prototyping'],
    interests: ['Design Systems', 'Accessibility', 'Motion Design'],
    avatar: 'https://i.pravatar.cc/150?img=6',
    location: 'London, UK'
  },
  {
    id: '4',
    name: 'Michael Zhang',
    role: 'Data Scientist',
    domain: 'Data Analytics & Business Intelligence',
    skills: ['Python', 'Machine Learning', 'SQL'],
    interests: ['Deep Learning', 'NLP', 'Data Visualization'],
    avatar: 'https://i.pravatar.cc/150?img=7',
    location: 'Toronto, Canada'
  }
];

import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  header: {
    marginBottom: 20,
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
  domainsScroll: {
    marginTop: 16,
  },
  domainsContainer: {
    paddingRight: 16,
    gap: 8,
  },
  domainChip: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  selectedDomainChip: {
    backgroundColor: '#000000',
  },
  domainChipText: {
    fontSize: 14,
    color: '#000000',
  },
  selectedDomainText: {
    color: '#FFFFFF',
  },
  profilesList: {
    flex: 1,
  },
  profilesListContent: {
    paddingBottom: Platform.select({
      ios: 100,
      android: 100,
      default: 80
    }),
  },
  card: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#EBEBEB',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  domain: {
    marginBottom: 8,
  },
  domainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    opacity: 0.8,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 6,
  },
  chatButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 8,
    borderRadius: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  role: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
    color: '#000000',
  },
  location: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
    color: '#000000',
  },
  sectionTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    opacity: 0.8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#000000'
  },
  skillText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  interestTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginBottom: 8
  },
  interestText: {
    color: '#000000',
    fontSize: 14
  }
});

function ProfileCard({ profile }: { profile: UserProfile }) {
  return (
    <TouchableOpacity>
      <ThemedView style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <View style={styles.headerInfo}>
            <ThemedText type="subtitle">{profile.name}</ThemedText>
            <ThemedText style={styles.role}>{profile.role}</ThemedText>
            <ThemedText style={styles.location}>{profile.location}</ThemedText>
          </View>
          <TouchableOpacity style={styles.chatButton}>
            <IconSymbol name="bubble.left" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
        <View style={styles.domain}>
          <ThemedText style={styles.domainText}>{profile.domain}</ThemedText>
        </View>
        <View style={styles.sectionTitle}>
          <ThemedText style={styles.sectionTitleText}>Skills</ThemedText>
        </View>
        <View style={styles.skillsContainer}>
          {profile.skills.map((skill, index) => (
            <View key={index} style={[styles.skillTag, { backgroundColor: '#000000' }]}>
              <ThemedText style={styles.skillText}>{skill}</ThemedText>
            </View>
          ))}
        </View>
        <View style={styles.sectionTitle}>
          <ThemedText style={styles.sectionTitleText}>Interests</ThemedText>
        </View>
        <View style={styles.interestsContainer}>
          {profile.interests.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <ThemedText style={styles.interestText}>{interest}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

export default function ExploreScreen() {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const filteredProfiles = selectedDomain === 'All'
    ? dummyProfiles
    : dummyProfiles.filter(profile => profile.domain === selectedDomain);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <ThemedText type="title">Build Your Next Team</ThemedText>
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
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.domainsScroll}
          contentContainerStyle={styles.domainsContainer}
        >
          <TouchableOpacity 
            style={[styles.domainChip, selectedDomain === 'All' && styles.selectedDomainChip]} 
            onPress={() => setSelectedDomain('All')}
          >
            <ThemedText style={[styles.domainChipText, selectedDomain === 'All' && styles.selectedDomainText]}>All</ThemedText>
          </TouchableOpacity>
          {DOMAINS.map((domain) => (
            <TouchableOpacity 
              key={domain}
              style={[styles.domainChip, selectedDomain === domain && styles.selectedDomainChip]}
              onPress={() => setSelectedDomain(domain)}
            >
              <ThemedText style={[styles.domainChipText, selectedDomain === domain && styles.selectedDomainText]}>{domain}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView 
        style={styles.profilesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.profilesListContent}
      >
        {filteredProfiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
