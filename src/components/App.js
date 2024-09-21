import Navbar from "./Navbar/Navbar";
import styles from "./App.module.css";
import "./App.font.css";

function App({ children }) {
  return (
    <>
      <Navbar className={styles.nav} />
      <div className={styles.body}>{children}</div>
    </>
  );
}

export default App;
