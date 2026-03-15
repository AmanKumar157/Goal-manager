import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GoalItem from './components/GoalItem';

export default function App() {
  const [goalText, setGoalText] = useState('');
  const [goals, setGoals] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Add new goal
  const addGoalHandler = () => {
    if (goalText.trim().length === 0) {
      return;
    }

    if (editingId) {
      // Update existing goal
      setGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === editingId
            ? { ...goal, text: goalText }
            : goal
        )
      );
      setEditingId(null);
    } else {
      // Add new goal
      setGoals((currentGoals) => [
        ...currentGoals,
        {
          id: Math.random().toString(),
          text: goalText,
          completed: false,
        },
      ]);
    }
    setGoalText('');
  };

  // Delete goal
  const deleteGoalHandler = (id) => {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  };

  // Toggle goal completion status
  const toggleGoalHandler = (id) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  // Start editing a goal
  const startEditHandler = (id, text) => {
    setEditingId(id);
    setGoalText(text);
  };

  // Cancel editing
  const cancelEditHandler = () => {
    setEditingId(null);
    setGoalText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerEmoji}>🎯</Text>
        <Text style={styles.headerTitle}>Goal Manager</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{goals.length}</Text>
            <Text style={styles.statLabel}>Total Goals</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{goals.filter((g) => g.completed).length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{goals.length - goals.filter((g) => g.completed).length}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>
        {goals.length > 0 && (
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View 
                style={[
                  styles.progressBarFill,
                  { width: `${(goals.filter((g) => g.completed).length / goals.length) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((goals.filter((g) => g.completed).length / goals.length) * 100)}% Complete
            </Text>
          </View>
        )}
      </LinearGradient>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          {editingId ? '✏️ Edit Your Goal' : '✨ Add New Goal'}
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="What do you want to achieve?"
            placeholderTextColor="#a0a0a0"
            value={goalText}
            onChangeText={setGoalText}
            onSubmitEditing={addGoalHandler}
            multiline
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.addButton,
              editingId && styles.updateButton,
            ]}
            onPress={addGoalHandler}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={editingId ? ['#00b4db', '#0083b0'] : ['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.addButtonText}>
                {editingId ? '✓ Update Goal' : '+ Add Goal'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          
          {editingId && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={cancelEditHandler}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>✕ Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.goalsContainer}>
        {goals.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>🚀</Text>
            <Text style={styles.emptyStateTitle}>No Goals Yet!</Text>
            <Text style={styles.emptyStateText}>
              Start your journey by adding your first goal above.{'\n'}
              Every great achievement starts with a single step.
            </Text>
          </View>
        ) : (
          <View style={styles.listWrapper}>
            <Text style={styles.sectionTitle}>Your Goals</Text>
            <FlatList
              data={goals}
              renderItem={({ item }) => (
                <GoalItem
                  goal={item}
                  onDelete={deleteGoalHandler}
                  onToggle={toggleGoalHandler}
                  onEdit={startEditHandler}
                />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fd',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight + 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    justifyContent: 'space-around',
    backdropFilter: 'blur(10px)',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 16,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 20,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: '#e8e8e8',
    borderRadius: 12,
    backgroundColor: '#f8f9fd',
    marginBottom: 16,
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  addButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButton: {
    shadowColor: '#00b4db',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ff4757',
  },
  cancelButtonText: {
    color: '#ff4757',
    fontSize: 17,
    fontWeight: '700',
  },
  goalsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listWrapper: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginVertical: 16,
    marginLeft: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  emptyStateEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
  },
});
