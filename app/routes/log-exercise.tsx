import { useEffect, useState } from "react";
import type { Route } from "./+types/log-exercise";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Log Exercise" },
        { name: "description", content: "log exercise" },
    ];
}

type Set = {
    reps: number;
    weight: number;
}

function Cell(){
    const [v, setV] = useState("")

    return (
        <div className="w-full p-1">
            <input 
                className={`w-full text-center rounded-sm ${v == "" ? "bg-gray-200" : ""}`}
                type="string"
                value={v}
                onChange={(e) => setV(e.target.value)}
                onBlur={(e) => {
                    const num = parseFloat(e.target.value);
                    if (isNaN(num)) {
                        setV("");
                    } else {
                        setV(num.toString());
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.currentTarget.blur();
                    }
                }}
            />
            
        </div>
    )
}

export default function LogExercise() {
    const params = useParams();
    const exerciseName = params["exercise-name"];
    const exerciseId = params["exercise-id"];

    const [sets, setSets] = useState<Set[]>([])

    function addSet(){
        setSets([...sets, {reps: 0, weight: 0}])
    }

    useEffect(() => {
        addSet()
    }, [])

    return (
        <div className="flex flex-col items-center mt-8">
            <p className="font-medium text-lg">Exercise Name: {exerciseName}</p>
            <div className="flex flex-row w-[80%] max-w-[20rem] mt-2">
                <div className="flex flex-col w-1/2 border-r-2">
                    <p className="border-b-2 w-full text-center">Reps</p>
                    {sets.map((set, index) => {
                        return <Cell key={index} />
                    })}
                </div>
                <div className="flex flex-col w-1/2">
                    <p className="border-b-2 w-full text-center">Weight</p>
                    {sets.map((set, index) => {
                        return <Cell key={index} />
                    })}
                </div>
            </div>
            <button
                className="mt-4 bg-gray-200 px-3 py-1 rounded-md cursor-pointer font-bold text-lg active:scale-90"
                onClick={addSet}
            >+</button>

            <textarea className="mt-4 w-[80%] max-w-[20rem] h-16 px-3 py-1 rounded-md border-2" placeholder="Notes" />

            <button className="mt-4 bg-gray-200 px-3 py-1 rounded-md cursor-pointer font-medium text-lg">Submit</button>

        </div>
    )
}
