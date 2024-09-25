import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Auth.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate'); // Default is 'candidate'
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
      
      // Store token and role in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); // Store the user role
      
      // Redirect based on the role
      if (response.data.role === 'interviewer') {
        navigate('/interviewer-home');
      } else if (response.data.role === 'candidate') {
        navigate('/candidate-home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <label>
          <input
            type="radio"
            value="candidate"
            checked={role === 'candidate'}
            onChange={() => setRole('candidate')}
          />
          Candidate
        </label>
        <label>
          <input
            type="radio"
            value="interviewer"
            checked={role === 'interviewer'}
            onChange={() => setRole('interviewer')}
          />
          Interviewer
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
