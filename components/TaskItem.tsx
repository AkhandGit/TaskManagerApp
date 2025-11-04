import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Pressable } from 'react-native';
import { Task } from '../app/context/TaskContext';
import { useTheme } from '../app/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  isDark: boolean;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#1e1e1e' : '#fff',
    border: isDark ? '#5b8efc' : '#2b7cff',
    text: isDark ? '#f4f4f4' : '#1b1b1b',
    completed: '#888',
    deleteBtn: isDark ? '#ff4d4d' : '#ff6b6b',
  };

  return (
    <View style={[styles.row, { backgroundColor: colors.background, shadowColor: isDark ? '#000' : '#aaa' }]}>
      {/* Checkbox */}
      {Platform.OS === 'web' ? (
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          style={{ ...styles.checkboxWeb, accentColor: colors.border }}
        />
      ) : (
        <Pressable
          onPress={() => onToggle(task.id)}
          style={[
            styles.checkbox,
            { borderColor: colors.border },
            task.completed && { backgroundColor: colors.border },
          ]}
        >
          {task.completed && <Ionicons name="checkmark" size={14} color="#fff" />}
        </Pressable>
      )}

      {/* Task title */}
      <Text
        style={[
          styles.title,
          { color: task.completed ? colors.completed : colors.text },
          task.completed && styles.completed,
        ]}
      >
        {task.title}
      </Text>

      {/* Delete button */}
      <TouchableOpacity onPress={() => onDelete(task.id)} style={[styles.deleteBtn, { backgroundColor: colors.deleteBtn }]}>
        <Ionicons name="trash-outline" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
  flexDirection: 'row',
  paddingVertical: 12,
  paddingHorizontal: 14,
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 12,
  marginVertical: 6,
  shadowColor: '#000',
  shadowOpacity: 0.25,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
},

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 6,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxWeb: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginRight: 12,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  deleteBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
