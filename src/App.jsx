import './App.css';
import StudentList from './components/StudentList';
import Layout from './components/Layout';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const username = "Tauseef";

  return (
    <>
      <Layout
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
      >
     
        <StudentList /> {/* Now StudentList is part of the Layout component */}
      </Layout>
    </>
  );
}

export default App;
