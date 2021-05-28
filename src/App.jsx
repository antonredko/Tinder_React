import { Button } from 'antd';
import { useEffect } from 'react';
import './App.css';
import FormAuth from './components/FormAuth';
import { useAuth } from './hooks/useAuth';

function App() {
  const auth = useAuth()

  useEffect(() => {
      console.log(auth);
  }, [auth])

  return (
    <>
      {auth.user && (
        <Button type="primary" htmlType="button" onClick={() => auth.signout()}>
          SignOUT
        </Button>
      )}
      <FormAuth />
    </>
  );
}

export default App;
