import { useEffect, useState }
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

import Navbar from "../components/Navbar";
import LessonCard from "../components/LessonCard";
import bookImage from "../assets/sachtinhoc3_kn.jpg"
import introimage from "../assets/phongmay.jpg"


function Dashboard(){

  const [student,setStudent] =
    useState(null);

  const [showMenu,setShowMenu] =
    useState(false);

  async function loadStudent(){

    const uid =
      localStorage.getItem("uid");

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

  if(!student){

    return <h1>Loading...</h1>;
  }

  return(

    <div className="dashboard">

      {/* TOPBAR */}

      <Navbar />

       

      {/* CONTENT */}

      <div className="home-content">

  <h1 className="welcome-title">
    Chào mừng đến với Tin học lớp 3 🎉
  </h1>

  {/* SECTION 1 */}

  <div className="intro-section">

    {/* LEFT */}

    <div className="intro-text">

      <h2>
        🌟 Giới thiệu
      </h2>

      <p>
        Đây là trang web để các bạn ôn tập lại
        kiến thức Tin học 3.
      </p>

      <p>
        Trang web có phần lý thuyết và phần
        thực hành trọng tâm của môn Tin học 3.
      </p>

      <p>
        Nội dung các bài học dựa trên sách
        Tin học 3 (Kết nối tri thức với cuộc sống).
      </p>

      <p>
        Nội dung trọng tập của website chủ yếu giúp các bạn ôn tập và
        thực hành kỹ năng sử dụng chuột,
        thao tác với bàn phím và thực hiện
        các câu hỏi trắc nghiệm.
      </p>

    </div>

    {/* RIGHT */}

    <div className="intro-image">

      <img
    src={introimage}
    alt=""
  />

    </div>

  </div>

  {/* SECTION 2 */}

  <div className="book-section">

    {/* LEFT */}

    <div className="book-text">

      <h2>
        📘 Tin học 3
      </h2>

      <p>
        <strong><font color="black">Tác giả:</font></strong>
      
      </p>
      <p>
        TS. Nguyễn Chí Công
        (Tổng chủ biên)
      </p>

      <p>
        TS. Hoàng Thị Mai
        (Chủ biên)
      </p>

      <p>
        ThS. Phan Anh
      </p>

      <p>
        CN. Nguyễn Thu Hiền
      </p>

      <p>
        CN. Nguyễn Bá Tuấn
      </p>

      <p>
        ThS. Hà Đăng Cao Tùng
      </p>

      <p>
        ThS. Đặng Bích Việt
      </p>

    </div>

    {/* RIGHT */}

    <div className="book-image">

  <img
    src={bookImage}
    alt=""
  />

</div>

  </div>

</div>
</div>
  );

}

export default Dashboard;