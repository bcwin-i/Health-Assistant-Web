import { makeStyles } from "@mui/styles";

//Local imports
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/background.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
}));

function App() {
  const styles = useStyles();

  return <div className={styles.root}></div>;
}

export default App;
