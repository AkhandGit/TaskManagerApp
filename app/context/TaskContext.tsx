import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  refreshFromApi: () => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const STORAGE_KEY = '@taskmanager_tasks';

  // To Save tasks to storage whenever they change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((err) =>
      console.log('Error saving tasks', err)
    );
  }, [tasks]);

  // To Load tasks from storage on every startup
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      } else {
        await refreshFromApi(); // initial fetch if no local data
      }
    })();
  }, []);

  
  const refreshFromApi = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data: any[] = await res.json();
      const mapped: Task[] = data.map((d) => ({
        id: d.id,
        title: String(d.title),
        completed: Boolean(d.completed),
      }));
      setTasks(mapped);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch tasks from API');
    }
  };

  const addTask = (title: string) => {
    if (!title.trim()) return;
    const id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask: Task = { id, title, completed: false };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, refreshFromApi }}>
      {children}
    </TaskContext.Provider>
  );
};
