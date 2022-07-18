

import Input from './components/Input';
import { Header } from './components/Header';
import styles  from './App.module.css';


function App() {
  return (
    <div className={styles.wrapper}>
    
      <Header/>
       <main className={styles.content}>
       <Input/>
      </main>
    </div>
  );
}
export default App;
