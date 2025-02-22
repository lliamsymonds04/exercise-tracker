import { useState } from "react";
import type { Route } from "./+types/login";
import BeatLoader from "react-spinners/BeatLoader";

import ToggleButton from "~/components/ToggleButton";
import api from "~/helpers/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to the app" },
  ];
}

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function login() {
        console.log("login")
        try {
            const response = await api.post("/login", {
                username,
                password
            });
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false)
    }

    async function register() {
        console.log("register")
        try {
            const response = await api.post("/register", {
                username,
                password
            });
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col items-center  h-screen space-y-4">
            <h1 className="text-8xl w-2xl font-bold drop-shadow-md text-center font-serif mb-8 mt-4">Achieve Greatness</h1>
            <div className="w-72 mb-4">
                <ToggleButton 
                    backgroundColour="#FFFFF0"
                    activeColour="#F0F8FF"
                    toggle={isUserRegistered}
                    setToggle={setIsUserRegistered}
                    option1="Sign up"
                    option2="Login"
                />
            </div>
            
            <input
                className="bg-gray-200 rounded-2xl h-10 w-40 p-2"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                className="bg-gray-200 rounded-2xl h-10 w-40 p-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button 
                className="font-serif font-bold drop-shadow-md rounded-2xl h-10 w-[50%] max-w-[7rem] cursor-pointer mt-4"
                style={{backgroundColor: (username !== "" && password !== "") ? "#D9EAFD" : "#C4C4C4"}}
                onClick={() => {
                    if (isLoading) return
                    setIsLoading(true)
                    
                    isUserRegistered ? login() : register()
                }}
            >{isUserRegistered ? "Login" : "Register"}</button>

            <BeatLoader color="#333333" loading={isLoading}/>
        </div>
    )
}
