import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type ChatPreview = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
};

const dummyChats: ChatPreview[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    lastMessage: 'Thanks for reaching out! Id love to discuss the project further.',
    timestamp: '2:30 PM',
    unreadCount: 2,
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Emily Parker',
    lastMessage: 'When can we schedule a call to discuss the marketing strategy?',
    timestamp: '11:45 AM',
    unreadCount: 0,
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
];

function ChatPreviewCard({ chat }: { chat: ChatPreview }) {
  return (
    <TouchableOpacity>
      <ThemedView style={styles.chatCard}>
        <Image source={{ uri: chat.avatar }} style={styles.avatar} />
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <ThemedText type="subtitle">{chat.name}</ThemedText>
            <ThemedText style={styles.timestamp}>{chat.timestamp}</ThemedText>
          </View>
          <View style={styles.messagePreview}>
            <ThemedText 
              style={[styles.lastMessage, chat.unreadCount > 0 && styles.unreadMessage]} 
              numberOfLines={1}
            >
              {chat.lastMessage}
            </ThemedText>
            {chat.unreadCount > 0 && (
              <View style={[styles.unreadBadge, { backgroundColor: '#000000' }]}>
                <ThemedText style={styles.unreadCount}>{chat.unreadCount}</ThemedText>
              </View>
            )}
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

export default function ChatsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
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
      </View>
      <ScrollView style={styles.chatsList}>
        {dummyChats.map(chat => (
          <ChatPreviewCard key={chat.id} chat={chat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

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
  chatsList: {
    flex: 1,
  },
  chatCard: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: '#EBEBEB',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    opacity: 0.8,
    marginRight: 8,
  },
  unreadMessage: {
    fontWeight: '600',
    opacity: 1,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    backgroundColor: '#00ADB5',
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});