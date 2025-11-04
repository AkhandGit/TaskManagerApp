import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { TaskProvider, useTasks } from './context/TaskContext';
import TaskItem from '../components/TaskItem';

function TaskListInner() {
  const { tasks, toggleTask, deleteTask, refreshFromApi } = useTasks();
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshFromApi();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <TouchableOpacity onPress={() => router.push('/add-task')} style={styles.addBtn}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet</Text>}
      />
    </View>
  );
}

export default function IndexScreen() {
  
  return (
    <TaskProvider>
      <TaskListInner />
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 8 },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: { fontSize: 24, fontWeight: '600' },
  addBtn: {
    backgroundColor: '#2b7cff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
  addText: { color: 'white', fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 24, color: '#666' },
});
