# 🎯 Goal Manager Mobile App

A beautiful and functional Goal Manager app built with **React Native** and **Expo**.

## ✨ Features

- ✅ **Create Goals**: Add new goals with a clean text input
- ✏️ **Update Goals**: Edit existing goals easily
- ✓ **Mark as Done**: Toggle completion status with visual feedback
- 🗑️ **Delete Goals**: Remove goals with confirmation alert
- 📊 **Progress Tracking**: See how many goals you've completed
- 🎨 **Modern UI**: Clean, intuitive interface with smooth interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (installed globally)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

3. **Run on your device:**
   - Scan the QR code with the Expo Go app (Android/iOS)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## 📱 How to Use

1. **Add a Goal**: Enter your goal in the text field and tap "Add Goal"
2. **Mark as Complete**: Tap the checkmark button or tap the goal text
3. **Edit a Goal**: Tap the edit (✎) button, modify the text, and tap "Update"
4. **Delete a Goal**: Tap the trash (🗑) button and confirm deletion

## 📂 Project Structure

```
Goal Manager/
├── App.js              # Main application file
├── components/
│   └── GoalItem.js     # Individual goal item component
├── package.json        # Dependencies and scripts
├── app.json           # Expo configuration
├── babel.config.js    # Babel configuration
└── README.md          # This file
```

## 🛠️ Built With

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Hooks (useState)** - State management
- **StyleSheet** - Styling

## 🎨 UI Features

- Completed goals show with:
  - Green background tint
  - Strikethrough text
  - Green left border indicator
- Progress counter in header
- Smooth animations and interactions
- Empty state message when no goals exist
- Confirmation dialog before deletion

## 📝 Code Highlights

### State Management
```javascript
const [goals, setGoals] = useState([]);
const [goalText, setGoalText] = useState('');
const [editingId, setEditingId] = useState(null);
```

### Goal Structure
```javascript
{
  id: string,
  text: string,
  completed: boolean
}
```

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

Built as a demonstration of React Native and Expo capabilities for mobile app development.

---

**Happy Goal Setting!** 🎯✨
