import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../app/context/TaskContext';

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.titleWrap}>
        <Text style={[styles.title, task.completed && styles.completed]}>{task.title}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  titleWrap: { flex: 1, marginRight: 12 },
  title: { fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: '#888' },
  deleteBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#ff6b6b',
    borderRadius: 6,
  },
  deleteText: { color: 'white' },
});
