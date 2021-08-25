import { useState, useRef } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from 'next/router';

const createUser = async (email, password) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log('data: ', data);

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      // log user in
      // redirect: false で throw new Error() した時の redirect を防止(api/auth/[...nextauth].js)
      // The redirect option is only available for credentials and email providers.
      // signIn("credentials")で [...nextauth].js の Providers.Credentials({}) に繋がってるはず
      // 第二引数が [...nextauth].js の Providers.Credentials({})の  async authorize(credentials) {}の credentials に入る
      // ログイン（サインイン）が成功したら Next が JWT を自動で Cookie に保存してくれる（[...nextauth].jsでsession: {jwt: true} にしているから jwt を使える）
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      console.log("👆 result of sign in: ", result);

      if (!result.error) {
        // state の変更（reload すると state が消えるため, JWT でその辺を解決できるようにする）
        // profile 画面に遷移
        router.replace('/profile');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log("⭐️ result: ", result);
      } catch (error) {
        console.log("💥 error: ", error);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
