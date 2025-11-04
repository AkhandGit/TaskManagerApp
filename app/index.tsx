import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "./context/TaskContext";
import { useTheme } from "./context/ThemeContext";
import TaskItem from "../components/TaskItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskListScreen() {
  const { tasks, toggleTask, deleteTask, refreshFromApi } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  // ✅ Type-safe boolean flag
  const isDark: boolean = theme === "dark";

  const colors = {
    background: isDark ? "#202124" : "#f4f6fa",
    header: isDark ? "#18191b" : "#e8ecf3",
    text: isDark ? "#f1f1f1" : "#1b1b1b",
    button: isDark ? "#5b8efc" : "#2b7cff",
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.header }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Task Manager
        </Text>

        <View style={styles.headerIcons}>
          {/* Theme toggle */}
          <TouchableOpacity onPress={toggleTheme} style={styles.iconBtn}>
            <Ionicons
              name={isDark ? "sunny-outline" : "moon-outline"}
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>

          {/* Add Task */}
          <TouchableOpacity
            onPress={() => router.push("/add-task")}
            style={[styles.iconBtn, { backgroundColor: colors.button }]}
          >
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      <View style={[styles.body, { backgroundColor: colors.background }]}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
              isDark={isDark}
            />
          )}
          onRefresh={refreshFromApi}
          refreshing={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 8,
  },
  body: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
});
