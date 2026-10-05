import { Show } from "@clerk/react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import TextCursor from "./TextCursor/TextCursor";
function App() {
  return (
    <>
        <TextCursor
          text=""
          spacing={80}
          followMouseDirection
          randomFloat
          exitDuration={0.3}
          removalInterval={20}
          maxPoints={10}
        />
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
