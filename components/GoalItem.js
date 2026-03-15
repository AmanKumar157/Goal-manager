import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GoalItem({ goal, onDelete, onToggle, onEdit }) {
  const handleDelete = () => {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(goal.id),
        },
      ]
    );
  };

  return (
    <View style={[styles.goalItem, goal.completed && styles.completedGoal]}>
      <TouchableOpacity
        style={styles.goalContent}
        onPress={() => onToggle(goal.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, goal.completed && styles.checkboxCompleted]}>
          {goal.completed && (
            <LinearGradient
              colors={['#11998e', '#38ef7d']}
              style={styles.checkboxGradient}
            >
              <Text style={styles.checkmark}>✓</Text>
            </LinearGradient>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.goalText,
              goal.completed && styles.completedGoalText,
            ]}
            numberOfLines={3}
          >
            {goal.text}
          </Text>
          {goal.completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>✓ Done</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onToggle(goal.id)}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={goal.completed ? ['#ffd89b', '#19547b'] : ['#11998e', '#38ef7d']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {goal.completed ? '↺' : '✓'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onEdit(goal.id, goal.text)}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>✎</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#ff6b6b', '#ee5a6f']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>✕</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  completedGoal: {
    backgroundColor: '#f0fdf4',
    borderLeftColor: '#10b981',
    shadowColor: '#10b981',
  },
  goalContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#667eea',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxCompleted: {
    borderWidth: 0,
  },
  checkboxGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  goalText: {
    fontSize: 16,
    color: '#2d3748',
    lineHeight: 22,
    fontWeight: '500',
  },
  completedGoalText: {
    textDecorationLine: 'line-through',
    color: '#10b981',
    opacity: 0.8,
  },
  completedBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  completedBadgeText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
