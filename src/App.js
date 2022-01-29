//Local imports
import "./App.css";
import { LandinPageCover } from "./utils/styles";
import background from "./assets/background.jpg"
import Header from "./components/Welcome/Header";
import IntroSection from "./components/Welcome/IntroSection";

function App() {
  return <LandinPageCover background={background}>
    <Header/>
    <IntroSection/>
  </LandinPageCover>;
}

export default App;
