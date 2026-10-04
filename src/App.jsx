import { Show } from "@clerk/react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Show when="signed-in">
        <Navbar />
        <Manager />
        <Footer />
      </Show>
      <Show when="signed-out">
        <Navbar />
        <Landing />
        <Footer />
      </Show>
    </>
  );
}

export default App;
