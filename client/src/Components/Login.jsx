import React, { useState } from 'react';
import '../Styles/login.css'; // Import CSS for styling
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const LoginSignupPage = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('user');
  const [signupType, setSignupType] = useState('user');
  const [providerType, setProviderType] = useState('');
  const [category, setCategory] = useState('');
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });
  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: '',
    mobileNumber: '',
  });

  const[state,SetState] = useState(0)

  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
  };

  const handleSignupTypeChange = (event) => {
    setSignupType(event.target.value);
  };

  const handleProviderTypeChange = (event) => {
    setProviderType(event.target.value);
    setCategory('');
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignupInputChange = (event) => {
    const { name, value } = event.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const login = async ()=> {
    if(loginType=="user"){
      const data = {
        email:loginFormData.username,
        password:loginFormData.password
      }
      console.log(data)
      const Response = await axios.post("http://localhost:8080/login",data)
  
      if(Response != null){
        navigate('/user'
        , { state:
        (Response.data)
        }
        );
      }
      else{
        console.log("mope")
      }
    }
    else{
      const data = {
        email:loginFormData.username,
        password:loginFormData.password
      }
      console.log(data)
      const Response = await axios.post("http://localhost:8080/organ/login",data)
  
      console.log(Response.data)
      if(Response != null){
        navigate('/org'
        , { state:
        (Response.data)
        }
        );
      }
      else{
        console.log("mope")
      }
    }
  }

  const signup = async ()=> {
    if(signupType=="user"){
      const data = {
        email:signupFormData.email,
        password:signupFormData.password,
        phonenumber:signupFormData.mobileNumber,
        name: signupFormData.name
      }
      console.log(data)
      const Response = await axios.post("http://localhost:8080/signup",data)
  
      if(Response != null){
        navigate('/');
      }
      else{
        console.log("mope")
      }
    }
    else{
      const data = {
        email:signupFormData.email,
        password:signupFormData.password,
        phonenumber:signupFormData.mobileNumber,
        name: signupFormData.name,
        category: providerType,
        designation: category
      }
      console.log(data)
      const Response = await axios.post("http://localhost:8080/organ/signup",data)
  
      if(Response != null){
        navigate('/');
      }
      else{
        console.log("mope")
      }
    }
  }

  return (
    <>
    <NavBar isLoggedIn={1}/>
    <div className='login'>
    <div className="container">
    {(state==0)?(
    <>
      <h2>Login</h2>
      <div>
        {/* Login type dropdown */}
        <select value={loginType} onChange={handleLoginTypeChange}>
          <option value="user">User</option>
          <option value="organization">Organization</option>
        </select>

        <input type="text" name="username" placeholder="Username or Email" onChange={handleLoginInputChange} value={loginFormData.username} />
        <input type="password" name="password" placeholder="Password" onChange={handleLoginInputChange} value={loginFormData.password} />

        <button onClick={login}>Login</button>
        <a onClick={()=>{SetState(1)}}>Not yet had account?...</a>
      </div>
      </>
    ):(
    <>
      <h2>Signup</h2>
      <div>
        {/* Signup type dropdown */}
        <select value={signupType} onChange={handleSignupTypeChange}>
          <option value="user">User</option>
          <option value="organization">Organization</option>
        </select>

        <input type="text" name="name" placeholder="Name" onChange={handleSignupInputChange} value={signupFormData.name} />
        <input type="text" name="email" placeholder="Email" onChange={handleSignupInputChange} value={signupFormData.email} />
        <input type="password" name="password" placeholder="Password" onChange={handleSignupInputChange} value={signupFormData.password} />
        <input type="password" name="reEnterPassword" placeholder="Re-enter Password" onChange={handleSignupInputChange} value={signupFormData.reEnterPassword} />
        <input type="text" name="mobileNumber" placeholder="Mobile Number" onChange={handleSignupInputChange} value={signupFormData.mobileNumber} />

        {signupType === 'organization' && (
          <>
            <select value={providerType} onChange={handleProviderTypeChange}>
              <option value="">Select Provider Type</option>
              <option value="consultant">Consultant</option>
              <option value="specialist">Specialist</option>
              <option value="lecturer">Lecturer</option>
            </select>

            {providerType && (
              <select value={category} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {providerType === 'consultant' && (
                  <>
                    <option value="kids">Kids</option>
                    <option value="adults">Adults</option>
                    <option value="old">Old</option>
                  </>
                )}
                {providerType === 'specialist' && (
                  <>
                    <option value="cardiologist">Cardiologist</option>
                    <option value="neurologist">Neurologist</option>
                    <option value="ENT">ENT</option>
                    <option value="dermatologist">Dermatologist</option>
                    <option value="orthopedist">Orthopedist</option>
                    <option value="ophthalmologist">Ophthalmologist</option>
                    <option value="gastroenterologist">Gastroenterologist</option>
                    <option value="urologist">Urologist</option>
                    <option value="endocrinologist">Endocrinologist</option>
                  </>
                )}
                {providerType === 'lecturer' && (
                  <>
                    <option value="dean">Dean</option>
                    <option value="senior">Senior Lecturer</option>
                    <option value="junior">Junior Lecturer</option>
                    <option value="labAssistant">Lab Assistant</option>
                  </>
                )}
              </select>
            )}
          </>
        )}

        <button onClick={signup}>Signup</button>
        <a onClick={()=>{SetState(0)}}>already had account?...</a>
      </div>
      </>
      )}
    </div>
    </div>
    </>
  );
};

export default LoginSignupPage;
