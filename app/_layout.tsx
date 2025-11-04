import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TaskProvider } from "./context/TaskContext"; 

export default function RootLayout() {
  return (
    <TaskProvider>   
      <Stack>
        <Stack.Screen name="index" options={{ title: "Tasks" }} />
        <Stack.Screen name="add-task" options={{ title: "Add Task" }} />
      </Stack>
      <StatusBar style="auto" />
    </TaskProvider>
  );
}
