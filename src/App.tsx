// src/App.tsx
import { Header } from "./components/Header";
import Events from "./pages/Events";
import { Button } from "./components/Button";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Events />
      </main>
      <Footer />
    </div>
  );
}

export default App;