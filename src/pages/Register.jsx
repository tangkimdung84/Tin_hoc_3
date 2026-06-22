import { useState }
from "react";

import {
  createUserWithEmailAndPassword
}
from "firebase/auth";

import {
  doc,
  setDoc
}
from "firebase/firestore";

import {
    auth,
  db
}


from "../firebase";

function Register(){

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

const [parentCode,setParentCode] =
  useState("");

  async function handleRegister(){

  try{

    const userCredential =

      await createUserWithEmailAndPassword(

        auth,

        email + "@tinhoc3.com",

        password
      );

    const user =
      userCredential.user;

    /* SAVE DATABASE */

    await setDoc(

      doc(db,"students",user.uid),

      {

        username:email,

        parentCode:parentCode,

        level:1,

        xp:0,

        score:0
      }
    );

    alert(
      "Đăng ký thành công!"
    );

    window.location.href =
    "/";

  }catch(error){

    console.log(error);

    if(
  error.code ===
  "auth/email-already-in-use"
){

  alert(
    "Tên đăng nhập đã tồn tại!"
  );

}else{

  alert(
    "Đăng ký thất bại!"
  );
}
  }
}



  return(

    <div className="login-page">

      <div className="login-box">

        <h1>
          📝 Đăng ký học sinh
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

<input
  type="text"
  placeholder="Mã phụ huynh"
  value={parentCode}
  onChange={(e)=>
    setParentCode(e.target.value)
  }
/>


        <button
          onClick={handleRegister}
          className="google-btn"
        >
          Đăng ký
        </button>

      </div>

    </div>
  );
}

export default Register;