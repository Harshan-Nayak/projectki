import { Modal, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import { updateProfile, type Profile } from '@/lib/profile';

type EditProfileModalProps = {
  visible: boolean;
  onClose: () => void;
  profile: Profile | null;
  onProfileUpdate: () => void;
};

export function EditProfileModal({ visible, onClose, profile, onProfileUpdate }: EditProfileModalProps) {
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
    if (!profile) return;

    try {
      setIsSubmitting(true);
      await updateProfile({
        ...profile,
        name,
        role,
        location,
        domain,
        skills,
        interests
      });
      onProfileUpdate();
      onClose();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ThemedView style={styles.modalContent}>
          <View style={styles.header}>
            <ThemedText type="subtitle">Edit Profile</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSymbol name="xmark" size={24} color="#000000" />
            </TouchableOpacity>
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
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 0
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 34,
    maxHeight: '90%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  closeButton: {
    padding: 4
  },
  form: {
    flex: 1
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000'
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000000'
  },
  tagInput: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8
  },
  tagInputField: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000000'
  },
  addButton: {
    backgroundColor: '#000000',
    width: 44,
    height: 44,
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
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 8
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0'
  },
  submitButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 16,
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