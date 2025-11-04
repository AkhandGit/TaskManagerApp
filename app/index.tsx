import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from './context/TaskContext';
import TaskItem from '../components/TaskItem';

export default function IndexScreen() {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  // 🔹 Optional: Disable refresh (since we no longer fetch API)
  const onRefresh = async () => {
    setRefreshing(true);
    // no API fetch anymore, just simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <TouchableOpacity onPress={() => router.push('/add-task')} style={styles.addBtn}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 8, backgroundColor: '#f4f6fa' },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 24, fontWeight: '600', color: '#1b1b1b' },
  addBtn: {
    backgroundColor: '#2b7cff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addText: { color: 'white', fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 24, color: '#666' },
});
