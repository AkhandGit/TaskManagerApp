import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

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

  //Load tasks from storage or API
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTasks(JSON.parse(stored));
        } else {
          await refreshFromApi();
        }
      } catch (err) {
        console.log('Error loading tasks:', err);
        await refreshFromApi();
      }
    })();
  }, []);

  //Save tasks to storage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((err) =>
        console.log('Error saving tasks', err)
      );
    }
  }, [tasks]);

  //Fetch tasks from Fake API
  const refreshFromApi = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data = await res.json();
      const mapped: Task[] = data.map((d: any) => ({
        id: d.id,
        title: String(d.title),
        completed: Boolean(d.completed),
      }));
      setTasks(mapped);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch tasks from API');
    }
  };

  const addTask = (title: string) => {
    if (!title.trim()) return;
    const id = Date.now();
    const newTask: Task = { id, title, completed: false };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const toggleTask = (id: number) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteTask = (id: number) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, refreshFromApi }}>
      {children}
    </TaskContext.Provider>
  );
};
