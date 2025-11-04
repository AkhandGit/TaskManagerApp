import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TaskProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="add-task" options={{ headerShown: false  }} />
          </Stack>
          <StatusBar style="auto" />
        </TaskProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
