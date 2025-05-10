import { AppProvider } from "@/providers";
import { MainRouter } from "@/routes";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}

export default App;
