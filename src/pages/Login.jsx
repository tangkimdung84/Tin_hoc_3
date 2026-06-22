import { useState }
from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup
}
from "firebase/auth";

import {
  auth,
  provider
}
from "../firebase";

function Login(){

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  async function handleLogin(){

    try{

      await signInWithEmailAndPassword(
          auth,
          email + "@tinhoc3.com",
          password
);

const user = auth.currentUser;

localStorage.setItem(
  "uid",
  user.uid
);

localStorage.setItem(
  "username",
  email
);

      alert(
        "Đăng nhập thành công!"
      );

      window.location.href =
      "/dashboard";

    }catch(error){

      console.log(error);

      alert(
        "Sai tài khoản hoặc mật khẩu"
      );
    }
  }

  async function handleGoogleLogin(){

    try{

      await signInWithPopup(
        auth,
        provider
      );

      alert(
        "Đăng nhập Google thành công!"
      );

      window.location.href =
      "/dashboard";

    }catch(error){

      console.log(error);

      alert("Lỗi đăng nhập");
    }
  }

  return(

    <div className="login-page">

      <div className="login-box">

        <h1>
          🎓 Tin học lớp 3
        </h1>

        <input
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="google-btn"
        >
          Đăng nhập
        </button>

        <button
          onClick={handleGoogleLogin}
          className="google-btn"
        >
          Đăng nhập Google
        </button>

        <p
          style={{
            marginTop:"20px",
            cursor:"pointer",
            color:"blue"
          }}

          onClick={()=>
            window.location.href =
            "/register"
          }
        >
          Chưa có tài khoản? Đăng ký
        </p>

      </div>

    </div>
  );
}

export default Login;