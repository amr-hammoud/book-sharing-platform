import React, { useEffect, useState } from "react";
import "./style.css";
import LoginForm from "../../Components/Auth/LoginForm";
import RegisterForm from "../../Components/Auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { localStorageAction } from "../../config/localstorage";

const Auth = () => {
  const [login, setLogin] = useState(true);

  
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorageAction("token") !== null) {
			navigate("/books");
		}
	}, []);

  return (
    <div className="flex center page">
      {login ? (
        <LoginForm onToggle={() => setLogin(false)} />
      ) : (
        <RegisterForm onToggle={() => setLogin(true)} />
      )}
    </div>
  );
}

export default Auth