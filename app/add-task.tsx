import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from './context/TaskContext';

export default function AddTaskScreen() {
  const [title, setTitle] = React.useState('');
  const { addTask } = useTasks();
  const router = useRouter();

  const onSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a task title');
      return;
    }
    addTask(title.trim());
    setTitle("");
    setTimeout(() => {
    router.back();
    }, 100); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task title</Text>
      <TextInput
        placeholder="Add your task to do..."
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity onPress={onSubmit} style={styles.saveBtn}>
        <Text style={styles.saveText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 24 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  saveBtn: {
    backgroundColor: '#2b7cff',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  saveText: { color: 'white', fontWeight: '600' },
});
