import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useTasks } from "./context/TaskContext";
import { useTheme } from "./context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const { addTask } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const isDark: boolean = theme === "dark";

  const colors = {
    background: isDark ? "#202124" : "#f4f6fa",
    header: isDark ? "#18191b" : "#e8ecf3",
    text: isDark ? "#f1f1f1" : "#1b1b1b",
    inputBg: isDark ? "#2a2b2d" : "#fff",
    button: isDark ? "#5b8efc" : "#2b7cff",
  };

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Please enter a task title.");
      return;
    }
    addTask(title);
    setTitle("");
    router.back();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.header }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.header }]}>
          <View style={styles.headerLeft}>
            <Ionicons name="create-outline" size={26} color={colors.button} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Add New Task
            </Text>
          </View>

          <TouchableOpacity onPress={toggleTheme} style={styles.iconBtn}>
            <Ionicons
              name={isDark ? "sunny-outline" : "moon-outline"}
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={[styles.label, { color: colors.text }]}>Task Title</Text>
          <TextInput
            placeholder="Enter task title"
            placeholderTextColor={isDark ? "#aaa" : "#777"}
            value={title}
            onChangeText={setTitle}
            style={[
              styles.input,
              { backgroundColor: colors.inputBg, color: colors.text },
            ]}
          />

          <TouchableOpacity
            onPress={handleAdd}
            style={[styles.addBtn, { backgroundColor: colors.button }]}
          >
            <Text style={styles.addText}>Save Task</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  iconBtn: {
    padding: 6,
    borderRadius: 8,
  },
  form: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  addBtn: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
