import { useEffect } from "react"
import { useNavigate } from "react-router";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Loading.." },
    { name: "description", content: "Index" },
  ];
}

export default function index() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/login")
    }, [])

    return (
      <div className="flex flex-col items-center  h-screen space-y-4">
        <h1 className="text-6xl w-lg font-bold drop-shadow-md text-center font-serif mb-8 mt-4">Loading!</h1>
        
      </div>
    )
}