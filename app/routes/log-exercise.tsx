import React, { useEffect, useRef, useState } from "react";
import type { Route } from "./+types/log-exercise";
import { useParams } from "react-router";

import api from "~/helpers/api";
import { error } from "console";

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

const SetsLimit = 10

export default function LogExercise() {
    const { exerciseName } = useParams()

    const [sets, setSets] = useState<string[]>([])
    const [note, setNote] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const setsData = useRef<Set[]>([])
    

    function addSet(){
        setSets([...sets, ""])
        setsData.current.push({reps: 0, weight: 0})
    }

    async function submit() {
        try {
            const response = api.post("/exercise/log", {
                exerciseName,
                sets: setsData.current,
                note,
            })
        } catch (error) {
            
        }
    }

    useEffect(() => {
        addSet()
    }, [])

    function handleNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setNote(event.target.value);
    };

    return (
        <div className="flex flex-col items-center mt-8">
            <p className="font-medium text-lg">Exercise Name: {exerciseName}</p>
            <div className="flex flex-row w-[80%] max-w-[20rem] mt-2">
                <div className="flex flex-col w-1/2 border-r-2">
                    <p className="border-b-2 w-full text-center">Reps</p>
                    {sets.map((_, index) => {

                        return <Cell key={index} saveInput={(v: number) => {
                            setsData.current[index].reps = v
                        }}/>
                    })}
                </div>
                <div className="flex flex-col w-1/2">
                    <p className="border-b-2 w-full text-center">Weight</p>
                    {sets.map((_, index) => {
                        return <Cell key={index} saveInput={(v: number) => {
                            setsData.current[index].weight = v
                        }}/>
                    })}
                </div>
            </div>
            {sets.length < SetsLimit && <button
                className="mt-4 bg-gray-200 px-3 py-1 rounded-md cursor-pointer font-bold text-lg active:scale-90"
                onClick={addSet}
            >+</button>}

            <textarea className="mt-4 w-[80%] max-w-[20rem] h-16 px-3 py-1 rounded-md border-2" placeholder="Notes" onChange={handleNoteChange} value={note}/>

            <button className="mt-4 bg-gray-200 px-3 py-1 rounded-md cursor-pointer font-medium text-lg">Submit</button>

        </div>
    )
}
