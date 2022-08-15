import React, { useState } from "react";
// import {
//     createUserWithEmailAndPassword,
//     onAuthStateChanged, // 코드 추가
//     signInWithEmailAndPassword, // 코드 추가
//     signOut, // 코드추가
// } from "firebase/auth";
// import { auth } from "../firebase-config";

const App = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    
    const [loginEmail, setLoginEmail] = useState(""); // 코드 추가
    const [loginPassword, setLoginPassword] = useState(""); // 코드 추가
    const [user, setUser] = useState({}); // 코드 추가

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // });

    //회원가입
    const register = async () => {
        try {
            // const user = await createUserWithEmailAndPassword(
            //     auth,
            //     registerEmail,
            //     registerPassword
            // );
            // console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    //로그인
    const login = async () => {
        try {
            // const user = await signInWithEmailAndPassword(
            //     auth,
            //     loginEmail,
            //     loginPassword
            // );
            // console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    //로그아웃
    const logout = async () => {
        // await signOut(auth);
    };

    return (
        <div style={{ textAlign: "center", margin: 10 }}>
            <div>
                {/* 회원가입 */}
                <input
                    placeholder="Email"
                    onChange={(e) => {
                        setRegisterEmail(e.target.value);
                    }}
                />
                <input
                    placeholder="EmailPassword"
                    onChange={(e) => {
                        setRegisterPassword(e.target.value);
                    }}
                />
                <button onClick={register}>CreateUser</button>
            </div>
            <div>
                {/* 로그인 */}
                <h3>Login</h3>
                <input
                    placeholder="Email"
                    onChange={(e) => {
                        setLoginEmail(e.target.value);
                    }}
                />
                <input
                    placeholder="Password"
                    onChange={(e) => {
                        setLoginPassword(e.target.value);
                    }}
                />
                <button onClick={login}>Login</button>
                <div>User Logged In:</div>
                <div>{user?.email}</div>
                <button onClick={logout}>로그아웃</button>
            </div>
        </div>
    );
};
export default App;