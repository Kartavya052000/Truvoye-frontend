import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { post } from "../api/api";
import { useCookies } from 'react-cookie';


const VerifyEmail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useParams();
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  
  useEffect(() => {

    post("auth/verify-account/"+token, {})
      .then((response) => {
        console.log("Data submitted:", response.data);
        setCookie('token', response.data.token, { path: '/' });

        // //check if cookie is stored successfully
        // const cookieToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        // console.log("Cookie Token:", cookieToken);

        navigate("/dashboard"); 
        setData(response);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [token, setCookie]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const renderData = (obj) => {
    return Object.entries(obj).map(([key, value]) => (
      <div key={key} style={{ marginLeft: '20px' }}>
        <strong>{key}:</strong> {typeof value === 'object' ? renderData(value) : value.toString()}
      </div>
    ));
  };

  const redirectDecision = (obj)=>{
    if(obj.status === 201){
        if(obj.data.role === "User"){
            return <div style={{ marginLeft: '20px', marginTop: '20px'}}> <h2>User goes to Main Dashboard </h2>  </div>
        }else{
            return <div style={{ marginLeft: '20px', marginTop: '20px' }}> <h2>Driver goes to driver app</h2>  </div>
        }
    }
  }  

  return (
    <div>
      <h1>Fetched Data</h1>
      {renderData(data.data)}
      {redirectDecision(data)}
    </div>
  );
};

export default VerifyEmail;
