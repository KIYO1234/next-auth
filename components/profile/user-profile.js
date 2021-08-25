// import { getSession } from "next-auth/client";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
// import { useState, useEffect } from "react";

function UserProfile(props) {
  // Redirect away if NOT auth

  // const [isLoading, setIsLoading] = useState(true);
  // // logout している場合は session と loading は変わらない（loading がずっと true のまま）=> sessionがある（ログインしている）場合、useState()を使ってloadingの状態を管理する必要がある（useSessionのloadingとは違うが画面表示を切り替えるために必要）
  // // getSession() は最新の session と loading を取ってこれる
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = "/auth";
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  const changePasswordHandler = async (passwordData) => {
    console.log('passwordData: ', passwordData);
    // console.log("JSON.stringify(passwordData): ", JSON.stringify(passwordData));
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    // Uncaught (in promise) SyntaxError: Unexpected token I in JSON at position 0 の原因▼
    const data = await response.json();
    console.log('data: ', data);
    
    // if (!response.ok) {
    //   console.log("💥 something went wrong!");
    // } else {
    //   console.log("🔑 data(update password)", data);
    // }
  };

  

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
