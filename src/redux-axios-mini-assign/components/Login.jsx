import axios from "axios";
import { useState } from "react";
const USER_EMAIL = "abhishek.kumar6532@gmail.com";
const USER_PASSWORD = "abhishekEMT69!";
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginOnClick = async () => {
    const host = `https://academics.newtonschool.co/api/v1/user/login`;
    try {
      //   const response = await axios.post(host, {
      //     headers: {
      //       projectID: "lkkoqstnysf1",
      //       " Content-Type": "application/json",
      //     },
      //     body: {
      //       email: USER_EMAIL,
      //       password: USER_PASSWORD,
      //       appType: "facebook",
      //     },
      //   });
      const response = await axios.post(
        host,
        {
          email: USER_EMAIL,
          password: USER_PASSWORD,
          appType: "facebook",
        },
        {
          headers: {
            projectID: "lkkoqstnysf1",
            " Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      //   console.log(response.data.token);
      localStorage.setItem("bearerToken", JSON.stringify(response.data.token));
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {!isLoggedIn && <button onClick={loginOnClick}>LOGIN</button>}
      {isLoggedIn && <p>Abhishek KR </p>}
    </div>
  );
};

export default Login;
