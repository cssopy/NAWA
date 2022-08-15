import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase-config";

const App = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerRePassword, setRegisterRePassword] = useState("");

    const register = async () => {
        try {
            // const user = await createUserWithEmailAndPassword(
            //     auth,
            //     registerEmail,
            //     registerPassword,
            //     registerRePassword
            // );
            // console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <input
                placeholder="Email"
                onChange={(e) => {
                    setRegisterEmail(e.target.value);
                }}
                required
            />
            <input
                placeholder="Password"
                onChange={(e) => {
                    setRegisterPassword(e.target.value);
                }}
                required
            />
            <input
                placeholder="Password"
                onChange={(e) => {
                    setRegisterRePassword(e.target.value);
                }}
                required
            />            
            <button onClick={register}>회원 가입</button>
        </div>
    );
};
export default App;