import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import loaingimaa from "../utilities/got.gif";

const Profile = () => {
  const [loader, setloader] = useState(true);
  const [userData, setUserData] = useState("");

  const handleLogOut = () => {
    localStorage.clear();
  };

  const navigate = useNavigate();
  useEffect(() => {
    const userid = localStorage.getItem("userid");
    const fachedprofile = async () => {
      if (userid) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/profile",
            { userid }
          );
          setUserData(response.data.details);
          setloader(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate("/login");
      }
    };
    fachedprofile();
  }, [handleLogOut]);

  if (loader) {
    return (
      <div className="loader">
        <img src={loaingimaa} alt="Loading..." />
      </div>
    );
  }

  if (!userData) {
    return <div>404 Not Found</div>;
  } else {
    return (
      <ProfileContainer>
        <UserDetails>
          <li>{userData.name}</li>
          <li>{userData.username}</li>
          <li>{userData.email}</li>
          <li>{userData.phone}</li>
        </UserDetails>
        <LogOutButton onClick={handleLogOut}>Log Out</LogOutButton>
      </ProfileContainer>
    );
  }
};

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProfileContainer = styled.div`
  background-color: #2f2f32;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 80px rgba(255, 255, 255, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const UserDetails = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    background-color: #f9f9f9;
    margin: 0.5rem 0;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;
  }
`;

const LogOutButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

export default Profile;
