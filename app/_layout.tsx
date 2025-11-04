import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Tasks" }} />
        <Stack.Screen name="add-task" options={{ title: "Add Task" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
