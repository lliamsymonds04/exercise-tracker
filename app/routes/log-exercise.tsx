import React, { useRef, useState, useEffect, useMemo } from "react";
import type { Route } from "./+types/log-exercise";
import { useParams, useNavigate } from "react-router";
import { BounceLoading } from "respinner";

import { Alert, useAlertManager, alertHelper } from "~/components/Alert";
import getErrorMessage from "~/helpers/getErrorMessage";
import ExerciseData from "~/components/ExerciseData";
import getApi from "~/helpers/api";

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

function Cell({saveInput}: {saveInput: (v: number) => void}) {
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
                        saveInput(0)
                    } else {
                        setV(num.toString());
                        saveInput(num)
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

const SetsLimit = 5

export default function LogExercise() {
    const navigate = useNavigate();
    const api = useMemo(() => getApi(), []);
    const { exerciseName } = useParams()

    const [sets, setSets] = useState<string[]>([""])
    const [note, setNote] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const setsData = useRef<Set[]>([{reps: 0, weight: 0}])

    const alertManager = useAlertManager()

    function addSet(){
        setSets([...sets, ""])
        setsData.current.push({reps: 0, weight: 0})
    }

    async function submit() {
        if (isSubmitting) return
        setIsSubmitting(true)

        try {
            const response = await api.post("/exercise/log", {
                exercise_name: exerciseName,
                sets: setsData.current,
                note,
            })

            alertHelper(alertManager, false, "Success", "Exercise logged!")
            setTimeout(() => {
                navigate("/home", {replace: true})
                setIsSubmitting(false)
            }, 1000)
        } catch (error) {
            setIsSubmitting(false)
            alertHelper(alertManager, true, "Error", getErrorMessage(error))
        }
    }

    function handleNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setNote(event.target.value);
    };

    useEffect(() => {
        setSets([""])
        setNote("")
    }, [exerciseName, api])

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-6xl w-lg font-bold drop-shadow-md text-center font-serif mb-8 mt-4">{exerciseName}</h1>
            <p className="font-medium text-lg">Log Sets</p>

            <div className="flex flex-col w-[80%] max-w-[20rem] mt-2">
                <div className="flex flex-row w-full">
                    <p className="border-b-2 border-r-2 w-1/2 text-center">Reps</p>
                    <p className="border-b-2 w-1/2 text-center">Weight</p>
                </div>
                {sets.map((_, index) => {
                    return (
                        <div key={index} className="flex flex-row w-full">
                            <div className="w-1/2 border-r-2">
                                <Cell saveInput={(v: number) => {
                                    setsData.current[index].reps = v
                                }}/>
                            </div>
                            <div className="w-1/2">
                                <Cell saveInput={(v: number) => {
                                    setsData.current[index].weight = v
                                }}/>
                            </div>
                        </div>
                    )
                })}

            </div>

            {sets.length < SetsLimit && <button
                className="mt-4 bg-[#D9EAFD] px-3 py-1 rounded-md cursor-pointer font-bold text-lg active:scale-90"
                onClick={addSet}
            >+</button>}

            <ExerciseData exerciseName={exerciseName || "temp"}/>

            <textarea className="mt-12 w-[80%] max-w-[20rem] h-16 px-3 py-1 rounded-md border-2" placeholder="Notes" onChange={handleNoteChange} value={note}/>

            <button className="mt-4 bg-[#D9EAFD] px-3 py-1 rounded-md cursor-pointer font-medium text-lg" onClick={submit}>Submit</button>

            {isSubmitting && <BounceLoading className="mt-4" fill="#333333"/>}
            <Alert alertManager={alertManager} colour={alertManager.isError ? "red" : "#333333"} iconText={alertManager.isError ? "!" : "✓"}/>
        </div>
    )
}
