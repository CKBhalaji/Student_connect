import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  
  const handleLogin = () => {
    // After successful authentication
    login('student'); // or 'recruiter' based on user
  };
};