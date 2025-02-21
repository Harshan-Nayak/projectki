import { StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

type UserProfile = {
  name: string;
  role: string;
  location: string;
  domain: string;
  skills: string[];
  interests: string[];
  avatar: string;
};

const dummyProfile: UserProfile = {
  name: 'John Smith',
  role: 'Tech Entrepreneur',
  location: 'San Francisco, CA',
  domain: 'Technology & Engineering',
  skills: ['Product Strategy', 'Team Leadership', 'Startup Growth', 'AI/ML'],
  interests: ['Artificial Intelligence', 'Blockchain', 'Sustainable Tech'],
  avatar: 'https://i.pravatar.cc/150?img=3'
};



export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: dummyProfile.avatar }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editImageButton}>
                <IconSymbol name="pencil" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.nameSection}>
              <ThemedText type="subtitle" style={styles.name}>{dummyProfile.name}</ThemedText>
              <ThemedText style={styles.role}>{dummyProfile.role}</ThemedText>
              <View style={styles.locationContainer}>
                <IconSymbol name="mappin" size={16} color="#666666" />
                <ThemedText style={styles.location}>{dummyProfile.location}</ThemedText>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editProfileButton}>
                <IconSymbol name="pencil" size={20} color="#FFFFFF" />
                <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton}>
                <IconSymbol name="arrow.right.circle" size={20} color="#FF3B30" />
                <ThemedText style={styles.logoutText}>Logout</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.domain}>
            <ThemedText style={styles.domainText}>{dummyProfile.domain}</ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Skills</ThemedText>
            <View style={styles.skillsContainer}>
              {dummyProfile.skills.map((skill, index) => (
                <View key={index} style={[styles.skillTag, { backgroundColor: '#000000' }]}>
                  <ThemedText style={styles.skillText}>{skill}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Interests</ThemedText>
            <View style={styles.interestsContainer}>
              {dummyProfile.interests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <View style={styles.interestDot} />
                  <ThemedText style={styles.interestText}>{interest}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  scrollView: {
    flex: 1
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 16
  },
  profileInfo: {
    alignItems: 'center'
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#F8F8F8'
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  nameSection: {
    alignItems: 'center',
    marginBottom: 24
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center'
  },
  role: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
    textAlign: 'center'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  location: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
    width: '100%'
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600'
  },
  content: {
    padding: 16
  },
  domain: {
    marginBottom: 24
  },
  domainText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000'
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  skillTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  skillText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  interestsContainer: {
    gap: 12
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  interestDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000000',
    marginRight: 8
  },
  interestText: {
    color: '#000000',
    fontSize: 14
  }
});