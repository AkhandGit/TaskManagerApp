# 📱 Task Manager App (React Native + Expo)

A simple yet elegant **Task Manager App** built with **React Native** using **Expo**.  
This app allows users to **view, add, toggle, and delete tasks**, featuring **persistent storage**, a **dark/light theme toggle**, and data fetching from a **fake API**.

---

## 🚀 Features

- ✅ Fetch tasks from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/todos)
- ✅ Add, toggle, and delete tasks
- ✅ Persistent storage using AsyncStorage
- ✅ Dark / Light mode with smooth toggle
- ✅ Clean UI with custom headers
- ✅ Safe area layout (no overlap on Android/iOS)
- ✅ Expo Router for navigation

---

## 🧩 Tech Stack

- **React Native (Expo)**
- **Expo Router**
- **AsyncStorage** (for local persistence)
- **TypeScript**
- **Context API** (for state management)
- **react-native-safe-area-context**
- **@expo/vector-icons**

---

## 🧠 Project Structure

TaskManagerApp/
├── app/
│ ├── _layout.tsx # Root layout and providers
│ ├── index.tsx # Home screen (task list)
│ ├── add-task.tsx # Add new task screen
│ ├── context/
│ │ ├── TaskContext.tsx # Task state & logic
│ │ └── ThemeContext.tsx # Theme state (light/dark)
│ └── components/
│ └── TaskItem.tsx # Single task display component
│
├── assets/ # App assets (icons, images)
├── package.json
├── README.md
└── app.json / tsconfig.json




---

## ⚙️ Setup Instructions

Follow these simple steps to run the app locally 👇  

### Prerequisites
Make sure you have installed:
- **Node.js** (>= 16)
- **Expo CLI**
- **Expo Go App** on your mobile (Android/iOS)

###  Clone the repository
```bash
git clone https://github.com/AkhandGit/task-manager-app.git
cd task-manager-app

### Install dependencies
npm install

### Start the Expo development server
npx expo start

### Run on your device
Scan the QR code in your Expo Go app (Android)
Or open the camera app on iPhone and scan it

