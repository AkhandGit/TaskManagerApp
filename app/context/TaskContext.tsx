import React, { createContext, useContext, useEffect, useState } from 'react';
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
  clearAll: () => void;
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

  //Load tasks on startup
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTasks(JSON.parse(stored));
        }
      } catch (err) {
        console.log('Error loading tasks:', err);
      }
    })();
  }, []);

  //Save whenever tasks change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch(err =>
      console.log('Error saving tasks:', err)
    );
  }, [tasks]);

  const addTask = (title: string) => {
    if (!title.trim()) return;
    const id = Date.now();
    const newTask: Task = { id, title, completed: false };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const clearAll = () => {
    setTasks([]);
    AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, clearAll }}>
      {children}
    </TaskContext.Provider>
  );
};
