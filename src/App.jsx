import './App.css';
import FormAuth from './components/FormAuth';
import Profile from './components/Profile';
import { useAuth } from './hooks/useAuth';

function App() {
  const auth = useAuth()

  return (
    <>
      {auth.user && <Profile /> }
      <FormAuth />
    </>
  );
}

export default App;