import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Modal, TextInput, Animated, Keyboard } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const dummyPost = {
  title: 'Looking for Technical Co-Founder',
  description: 'Seeking a passionate developer to build a revolutionary AI platform. Experience with machine learning and cloud infrastructure required.\n\nWe are building a cutting-edge AI platform that will revolutionize how businesses interact with their data. Our vision is to democratize AI and make it accessible to companies of all sizes.\n\nRequired Skills:\n- Strong background in Machine Learning and AI\n- Experience with cloud platforms (AWS/GCP/Azure)\n- Proficient in Python and modern AI frameworks\n- Understanding of scalable architecture\n\nWhat we offer:\n- Significant equity stake\n- Opportunity to shape the technical direction\n- Direct impact on product strategy\n- Flexible working arrangements',
  domain: 'Technology',
  type: 'collaboration',
  postedBy: 'Sarah Chen',
  postedAt: '2 hours ago',
  likes: 128,
  comments: 45,
  saves: 23
};

export default function PostDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleCommentPress = () => {
    setIsCommentModalVisible(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalVisible(false);
    setCommentText('');
  };

  const handleSendComment = () => {
    // Here you would typically send the comment to your backend
    console.log('Sending comment:', commentText);
    handleCloseCommentModal();
  };

  // Redirect to not-found screen if id is not provided
  if (!id) {
    router.replace('/post-not-found');
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#000000" />
        </TouchableOpacity>
        <ThemedText type="subtitle">Opportunity Details</ThemedText>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.shareButton}>
            <IconSymbol name="square.and.arrow.up" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.postHeader}>
          <View style={styles.posterInfo}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
              style={styles.avatar}
            />
            <View style={styles.posterDetails}>
              <ThemedText style={styles.posterName}>{dummyPost.postedBy}</ThemedText>
              <ThemedText style={styles.postedTime}>{dummyPost.postedAt}</ThemedText>
            </View>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <ThemedText style={styles.followButtonText}>+ Follow</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.postContent}>
          <ThemedText type="subtitle" style={styles.title}>{dummyPost.title}</ThemedText>
          <View style={[styles.badge, { backgroundColor: '#00ADB5' }]}>
            <ThemedText style={styles.badgeText}>{dummyPost.type}</ThemedText>
          </View>
          <ThemedText style={styles.domain}>Domain: {dummyPost.domain}</ThemedText>
          <ThemedText style={styles.description}>{dummyPost.description}</ThemedText>
        </View>

        <View style={styles.engagementSection}>
          <TouchableOpacity style={styles.engagementButton}>
            <IconSymbol name="hand.thumbsup" size={20} color="#666666" />
            <ThemedText style={styles.engagementText}>{dummyPost.likes} Likes</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.engagementButton} onPress={handleCommentPress}>
            <IconSymbol name="bubble.left" size={20} color="#666666" />
            <ThemedText style={styles.engagementText}>{dummyPost.comments} Comments</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.engagementButton}>
            <IconSymbol name="bookmark" size={20} color="#666666" />
            <ThemedText style={styles.engagementText}>{dummyPost.saves} Saves</ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.applyButton}>
          <ThemedText style={styles.applyButtonText}>
            {dummyPost.type === 'job' ? 'Apply Now' : 'Express Interest'}
          </ThemedText>
        </TouchableOpacity>

        <Modal
          visible={isCommentModalVisible}
          transparent
          animationType="slide"
          onRequestClose={handleCloseCommentModal}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleCloseCommentModal}
          >
            <Animated.View 
              style={[styles.commentContainer, {
                transform: [{
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100]
                  })
                }]
              }]}
            >
              <View style={styles.commentHeader}>
                <ThemedText type="subtitle">Add Comment</ThemedText>
                <TouchableOpacity onPress={handleCloseCommentModal}>
                  <IconSymbol name="xmark" size={24} color="#000000" />
                </TouchableOpacity>
              </View>
              <View style={styles.commentInputContainer}>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                  style={styles.commentAvatar}
                />
                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder="Write a comment..."
                    placeholderTextColor="#999999"
                    style={styles.commentInput}
                    multiline
                    value={commentText}
                    onChangeText={setCommentText}
                  />
                  <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={handleSendComment}
                    disabled={!commentText.trim()}
                  >
                    <IconSymbol 
                      name="arrow.up.circle.fill" 
                      size={32} 
                      color={commentText.trim() ? '#00ADB5' : '#CCCCCC'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  backButton: {
    padding: 4,
  },
  headerRight: {
    width: 28,
  },
  shareButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  posterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  posterDetails: {
    justifyContent: 'center',
  },
  posterName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  postedTime: {
    fontSize: 12,
    color: '#666666',
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#00ADB5',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  postContent: {
    padding: 16,
    backgroundColor: '#EBEBEB',
  },
  title: {
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#00ADB5',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  domain: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  engagementSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    backgroundColor: '#EBEBEB',
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  engagementText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  applyButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#00ADB5',
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
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
});