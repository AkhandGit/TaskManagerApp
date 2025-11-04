import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Pressable } from 'react-native';
import { Task } from '../app/context/TaskContext';

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View style={styles.row}>
      {/* Checkbox */}
      {Platform.OS === 'web' ? (
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          style={styles.checkboxWeb}
        />
      ) : (
        <Pressable onPress={() => onToggle(task.id)} style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
          {task.completed && <Text style={styles.checkMark}>✓</Text>}
        </Pressable>
      )}

      {/* Task title */}
      <Text style={[styles.title, task.completed && styles.completed]}>
        {task.title}
      </Text>

      {/* Delete button */}
      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#007BFF',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007BFF',
  },
  checkMark: {
    color: 'white',
    fontWeight: 'bold',
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
    color: '#888',
  },
  deleteBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#ff6b6b',
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
