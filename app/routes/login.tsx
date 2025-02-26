import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/login";

import ToggleButton from "~/components/ToggleButton";
import api from "~/helpers/api";
import { BounceLoading } from "respinner";
import Alert from "~/components/Alert";
import debounce from "~/helpers/debounce";

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
    const [isAlertError, setIsAlertError] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    function alertHelper(isError: boolean, title: string, message: string) {
        setIsAlertError(isError)
        setAlertTitle(title)
        setAlertMessage(message)
        debounce(setShowAlert, 5000)
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

            navigate("/home");
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }
    }

    async function register() {
        try {
            const response = await api.post("/register", {
                username,
                password
            });

            navigate("/home");
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }
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
                className="font-serif font-bold drop-shadow-md rounded-2xl h-10 w-[50%] max-w-[7rem] cursor-pointer mt-4 active:scale-95 active:shadow-inner"
                style={{backgroundColor: (username !== "" && password !== "") ? "#D9EAFD" : "#C4C4C4"}}
                onClick={() => {
                    alertHelper(false, "Testing", "This is a test")
                    if (username === "" || password === "") return
                    if (isLoading) return
                    setIsLoading(true)
                    
                    isUserRegistered ? login() : register()
                }}
            >{isUserRegistered ? "Login" : "Register"}</button>

            {isLoading && <BounceLoading fill="#333333"/>}
            {showAlert && <Alert 
                colour={isAlertError ? "red" : "#333333"} 
                title={alertTitle}
                text={alertMessage} 
                iconText={isAlertError ? "!" : '✓'}
            />}
        </div>
    )
}
