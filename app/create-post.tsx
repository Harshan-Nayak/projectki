import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

export default function CreatePostScreen() {
  const router = useRouter();
  const [postText, setPostText] = useState('');
  const [selectedType, setSelectedType] = useState<'job' | 'collaboration'>('job');
  const [selectedDomain, setSelectedDomain] = useState('Technology');

  const domains = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing'];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText style={styles.cancelButton}>Cancel</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.postButton, { backgroundColor: '#00ADB5' }]}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.postButtonText}>Post</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          placeholder="What opportunity would you like to share?"
          placeholderTextColor="#999999"
          style={[styles.input, { color: '#000000' }]}
          multiline
          value={postText}
          onChangeText={setPostText}
        />

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Post Type</ThemedText>
          <View style={styles.typeContainer}>
            {(['job', 'collaboration'] as const).map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  { backgroundColor: selectedType === type ? '#00ADB5' : '#F5F5F5' }
                ]}
                onPress={() => setSelectedType(type)}
              >
                <ThemedText 
                  style={[
                    styles.typeButtonText,
                    { color: selectedType === type ? '#fff' : '#000000' }
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Domain</ThemedText>
          <View style={styles.domainContainer}>
            {domains.map(domain => (
              <TouchableOpacity
                key={domain}
                style={[
                  styles.domainButton,
                  { 
                    backgroundColor: selectedDomain === domain ? '#00ADB5' : '#F5F5F5',
                    borderColor: '#E0E0E0'
                  }
                ]}
                onPress={() => setSelectedDomain(domain)}
              >
                <ThemedText 
                  style={[
                    styles.domainButtonText,
                    { color: selectedDomain === domain ? '#fff' : '#000000' }
                  ]}
                >
                  {domain}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    fontSize: 16,
  },
  postButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  input: {
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  domainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  domainButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  domainButtonText: {
    fontSize: 14,
  },
});