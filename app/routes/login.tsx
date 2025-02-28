import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/login";

import ToggleButton from "~/components/ToggleButton";
import api from "~/helpers/api";
import { BounceLoading, BeatLoading } from "respinner";
import {Alert, useAlertManager, alertHelper} from "~/components/Alert";
import getErrorMessage from "~/helpers/getErrorMessage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to the app" },
  ];
}

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const alertManager = useAlertManager()

    function goHome() {
        setTimeout(() => {
            navigate("/home", { replace: true });
        }, 1000)
        setIsRedirecting(true)
    }

    useEffect(() => {
        setIsLoading(false)
    }, [])

    async function login() {
        try {
            const response = await api.post("/login", {
                username,
                password
            });

            alertHelper(alertManager, false, "Success", "Redirecting..")
            goHome()
        } catch (error) {
            alertHelper(alertManager, true, "Error", getErrorMessage(error))
        } finally {
            setIsLoading(false)
        }
    }

    async function register() {
        try {
            const response = await api.post("/register", {
                username,
                password
            });

            alertHelper(alertManager, false, "Success", "Successfully created account! Redirecting..")
            goHome()
        } catch (error) {
            alertHelper(alertManager, true, "Error", getErrorMessage(error))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center  h-screen space-y-4">
            <h1 className="text-8xl w-2xl font-bold drop-shadow-md text-center font-serif mb-8 mt-4">Achieve Greatness</h1>
            <div className="w-72 mb-4">
                <ToggleButton 
                    backgroundColour="#FFFFF0"
                    activeColour="#D9EAFD"
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
                className="font-serif font-bold drop-shadow-md rounded-lg h-10 w-[50%] max-w-[7rem] cursor-pointer mt-4 active:scale-95 active:shadow-inner"
                style={{backgroundColor: (username !== "" && password !== "") ? "#D9EAFD" : "#C4C4C4"}}
                onClick={() => {
                    if (username === "" || password === "" || isRedirecting) return
                    if (isLoading) return
                    setIsLoading(true)
                    
                    isUserRegistered ? login() : register()
                }}
            >{isUserRegistered ? "Login" : "Register"}</button>

            {isLoading && <BounceLoading fill="#333333"/>}
            <Alert alertManager={alertManager} colour={alertManager.isError ? "red" : "#333333"} iconText={alertManager.isError ? "!" : "✓"}/>
            {isRedirecting && <BeatLoading fill="#333333" duration={2}/>}
        </div>
    )
}
