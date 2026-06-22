import { useEffect,useState }
from "react";

import {
  doc,
  getDoc
}
from "firebase/firestore";

import {
  db
}
from "../firebase";

import {
  Link
}
from "react-router-dom";

function Navbar(){

  const [student,setStudent] =
    useState(null);

  const [showMenu,setShowMenu] =
    useState(false);

  async function loadStudent(){

    const uid =
      localStorage.getItem("uid");

    if(!uid) return;

    const docRef =
      doc(db,"students",uid);

    const docSnap =
      await getDoc(docRef);

    if(docSnap.exists()){

      setStudent(docSnap.data());
    }
  }

  useEffect(()=>{

    loadStudent();

  },[]);

  return(

    <div className="topbar">

      
      {/* MENU */}

      <div className="menu">

        <Link to="/dashboard">
          🏠 Trang chủ
        </Link>

        <Link to="/lessons">
          📚 Bài học
        </Link>

        <Link to="/mouse-game">
          🖱️ Luyện tập chuột
        </Link>

        <Link to="/typing-game">
          ⌨️ Luyện gõ phím
        </Link>

        <Link to="/quizzes">
          📝 Trắc nghiệm
        </Link>

      </div>

      {/* PROFILE */}

      {student && (

        <div
          className="profile-mini"
          onClick={()=>
            setShowMenu(!showMenu)
          }
        >

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />

          <span>
            {student.username}
          </span>

          {showMenu && (

            <div className="profile-dropdown">

              <p>
                ⭐ Level:
                {student.level}
              </p>

              <p>
                ⚡ XP:
                {student.xp}
              </p>

              <p>
                🏆 Điểm:
                {student.score}
              </p>

              <button
                onClick={()=>{

                  localStorage.clear();

                  window.location.href="/";
                }}
              >
                Đăng xuất
              </button>

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default Navbar;