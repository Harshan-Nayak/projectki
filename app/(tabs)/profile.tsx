import { StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

type ProfileStats = {
  connections: number;
  profileViews: number;
  pendingRequests: number;
};

type UserProfile = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  experience: Experience[];
  education: string;
  interests: string[];
  stats: ProfileStats;
};

type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
};

const dummyProfile: UserProfile = {
  name: 'John Smith',
  role: 'Tech Entrepreneur',
  bio: 'Passionate about building innovative solutions. Serial entrepreneur with focus on AI and blockchain technologies.',
  skills: ['Product Strategy', 'Team Leadership', 'Startup Growth', 'AI/ML'],
  experience: [
    {
      id: '1',
      role: 'Founder & CEO',
      company: 'TechVentures AI',
      duration: '2020 - Present'
    },
    {
      id: '2',
      role: 'Product Manager',
      company: 'InnovateCorp',
      duration: '2018 - 2020'
    }
  ],
  education: 'MBA - Stanford University',
  interests: ['Artificial Intelligence', 'Blockchain', 'Sustainable Tech'],
  stats: {
    connections: 245,
    profileViews: 89,
    pendingRequests: 5
  }
};

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <ThemedView style={[styles.statCard, { shadowColor: '#000' }]}>
      <ThemedText style={styles.statValue}>{value}</ThemedText>
      <ThemedText style={styles.statTitle}>{title}</ThemedText>
    </ThemedView>
  );
}

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <ThemedView style={styles.header}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={[styles.editButton, { backgroundColor: '#00ADB5' }]}>
              <IconSymbol size={20} name="pencil" color="#fff" />
            </TouchableOpacity>
          </View>
          <ThemedText type="title" style={styles.name}>{dummyProfile.name}</ThemedText>
          <ThemedText style={styles.role}>{dummyProfile.role}</ThemedText>
        </ThemedView>

        <View style={styles.statsContainer}>
          <StatCard title="Connections" value={dummyProfile.stats.connections} />
          <StatCard title="Profile Views" value={dummyProfile.stats.profileViews} />
          <StatCard title="Pending" value={dummyProfile.stats.pendingRequests} />
        </View>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">About</ThemedText>
          <ThemedText style={styles.bio}>{dummyProfile.bio}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Skills</ThemedText>
          <View style={styles.skillsContainer}>
            {dummyProfile.skills.map((skill, index) => (
              <View key={index} style={[styles.skillTag, { backgroundColor: '#00ADB5' }]}>
                <ThemedText style={styles.skillText}>{skill}</ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Experience</ThemedText>
          {dummyProfile.experience.map(exp => (
            <View key={exp.id} style={styles.experienceItem}>
              <ThemedText style={styles.expRole}>{exp.role}</ThemedText>
              <ThemedText style={styles.expCompany}>{exp.company}</ThemedText>
              <ThemedText style={styles.expDuration}>{exp.duration}</ThemedText>
            </View>
          ))}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Education</ThemedText>
          <ThemedText style={styles.education}>{dummyProfile.education}</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.section, styles.lastSection]}>
          <ThemedText type="subtitle">Interests</ThemedText>
          <View style={styles.interestsContainer}>
            {dummyProfile.interests.map((interest, index) => (
              <View key={index} style={[styles.interestTag, { backgroundColor: '#F5F5F5' }]}>
                <ThemedText>{interest}</ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  header: {
    padding: 16,
    alignItems: 'center'
  },
  profileHeader: {
    position: 'relative',
    marginBottom: 16
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ADB5'
  },
  name: {
    marginBottom: 4
  },
  role: {
    fontSize: 16,
    opacity: 0.8
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16
  },
  statCard: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#EBEBEB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4
  },
  statTitle: {
    fontSize: 12,
    opacity: 0.8
  },
  section: {
    padding: 16,
    marginBottom: 8
  },
  lastSection: {
    marginBottom: 24
  },
  bio: {
    marginTop: 8,
    lineHeight: 20
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  skillTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#00ADB5'
  },
  skillText: {
    color: '#fff',
    fontSize: 14
  },
  experienceItem: {
    marginTop: 12
  },
  expRole: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2
  },
  expCompany: {
    fontSize: 14,
    marginBottom: 2
  },
  expDuration: {
    fontSize: 12,
    opacity: 0.6
  },
  education: {
    marginTop: 8,
    fontSize: 16
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  interestTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  }
});