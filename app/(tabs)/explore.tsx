import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type UserProfile = {
  id: string;
  name: string;
  role: string;
  domain: string;
  skills: string[];
  avatar: string;
  location: string;
};

const dummyProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'David Kim',
    role: 'Software Engineer',
    domain: 'Technology',
    skills: ['React Native', 'Node.js', 'AWS'],
    avatar: 'https://i.pravatar.cc/150?img=4',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'Rachel Chen',
    role: 'Product Manager',
    domain: 'Product',
    skills: ['Product Strategy', 'UX Design', 'Agile'],
    avatar: 'https://i.pravatar.cc/150?img=5',
    location: 'New York, NY'
  },
];

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
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    fontSize: 16,
    color: '#000000',
  },
  profilesList: {
    flex: 1,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#EBEBEB',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
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
  domain: {
    marginBottom: 12,
  },
  domainText: {
    fontSize: 14,
    opacity: 0.7,
    color: '#000000',
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
    backgroundColor: '#00ADB5',
  },
  skillText: {
    color: '#fff',
    fontSize: 12,
  },
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
        </View>
        <View style={styles.domain}>
          <ThemedText style={styles.domainText}>{profile.domain}</ThemedText>
        </View>
        <View style={styles.skillsContainer}>
          {profile.skills.map((skill, index) => (
            <View key={index} style={[styles.skillTag, { backgroundColor: '#00ADB5' }]}>
              <ThemedText style={styles.skillText}>{skill}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <ThemedText type="title">Explore Profiles</ThemedText>
        <View style={[styles.searchContainer, { backgroundColor: '#F5F5F5' }]}>
          <TextInput
            placeholder="Search by skills, domain..."
            placeholderTextColor="#999999"
            style={styles.searchInput}
          />
        </View>
      </View>
      <ScrollView style={styles.profilesList}>
        {dummyProfiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
