import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import { updateProfile, type Profile } from '@/lib/profile';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type EditProfileScreenProps = {
  profile: Profile | null;
  onProfileUpdate: () => void;
};

export default function EditProfileScreen() {
  const router = useRouter();
  const profile = router.params?.profile as Profile | null;
  const onProfileUpdate = router.params?.onProfileUpdate as () => void;

  const [name, setName] = useState(profile?.name || '');
  const [role, setRole] = useState(profile?.role || '');
  const [location, setLocation] = useState(profile?.location || '');
  const [domain, setDomain] = useState(profile?.domain || '');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(profile?.skills || []);
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState<string[]>(profile?.interests || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };
  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name to continue');
      return;
    }

    try {
      console.log('Starting profile update...', { name, role, location, domain, skills, interests });
      setIsSubmitting(true);

      // Update profile data
      const updatedProfile = {
        id: profile?.id || '', // Ensure we have an ID, even if empty
        name: name.trim(),
        role: role.trim(),
        location: location.trim(),
        domain: domain.trim(),
        skills,
        interests,
        avatar_url: profile?.avatar_url || '',
        updated_at: new Date().toISOString()
      };

      console.log('Sending update request to server...');
      await updateProfile(updatedProfile);
      console.log('Profile updated successfully');

      // Show success message
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => {
          console.log('Triggering profile update callback...');
          onProfileUpdate();
          router.back();
        }}
      ]);
    } catch (error) {
      console.error('Profile update failed:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#000000" />
        </TouchableOpacity>
        <ThemedText type="subtitle">Edit Profile</ThemedText>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Name</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Role</ThemedText>
          <TextInput
            style={styles.input}
            value={role}
            onChangeText={setRole}
            placeholder="Enter your role"
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Location</ThemedText>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter your location"
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Domain</ThemedText>
          <TextInput
            style={styles.input}
            value={domain}
            onChangeText={setDomain}
            placeholder="Enter your domain"
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Skills</ThemedText>
          <View style={styles.tagInput}>
            <TextInput
              style={styles.tagInputField}
              value={skillInput}
              onChangeText={setSkillInput}
              placeholder="Add a skill"
              placeholderTextColor="#999999"
              onSubmitEditing={handleAddSkill}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddSkill}>
              <IconSymbol name="plus" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.tagsContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.tag}>
                <ThemedText style={styles.tagText}>{skill}</ThemedText>
                <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
                  <IconSymbol name="xmark" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Interests</ThemedText>
          <View style={styles.tagInput}>
            <TextInput
              style={styles.tagInputField}
              value={interestInput}
              onChangeText={setInterestInput}
              placeholder="Add an interest"
              placeholderTextColor="#999999"
              onSubmitEditing={handleAddInterest}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddInterest}>
              <IconSymbol name="plus" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.tagsContainer}>
            {interests.map((interest, index) => (
              <View key={index} style={styles.tag}>
                <ThemedText style={styles.tagText}>{interest}</ThemedText>
                <TouchableOpacity onPress={() => handleRemoveInterest(interest)}>
                  <IconSymbol name="xmark" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <ThemedText style={styles.submitButtonText}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE'
  },
  backButton: {
    padding: 8,
    marginLeft: -8
  },
  headerRight: {
    width: 40
  },
  form: {
    flex: 1,
    padding: 16
  },
  inputContainer: {
    marginBottom: 24
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16
  },
  tagInput: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12
  },
  tagInputField: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16
  },
  addButton: {
    backgroundColor: '#000000',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
    gap: 8
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE'
  },
  submitButton: {
    backgroundColor: '#000000',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center'
  },
  submitButtonDisabled: {
    opacity: 0.5
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});