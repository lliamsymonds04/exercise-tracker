import { useEffect, useState, useMemo } from "react";
import { BeatLoading } from "respinner";
import getApi from "~/helpers/api";

type CardProps = {
    date: string;
    sets: {reps: number, weight: number }[];
    note: string;
}

type ExerciseDataProps = {
    exerciseName: string;
}

function Card({ date, sets, note }: CardProps) {
    //add notes after just get basic layout down
    return (
        <div className="flex flex-col items-center justify-start bg-gray-200 w-[80%] max-w-[20rem] rounded-md">
            <div className="w-full flex flex-row items-center justify-start h-14">
                <p className="mx-2">{date}</p>
                <div className="w-0.75 h-full bg-[#333333] opacity-70"/>
                <div className="flex flex-col w-full items-start">
                    <div className="flex flex-row">
                        {sets.map((set, index) => {
                            return (
                                <div key={index} className="w-7 mx-2 text-center">
                                    {set.weight + "kg"}
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full h-0.5 bg-[#333333] opacity-70"/>
                    <div className="flex flex-row">
                        {sets.map((set, index) => {
                            return (
                                <div key={index} className="w-7 mx-2 text-center">
                                    {set.reps}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {note && <div className="p-1 border-t-2 w-full border-[rgba(51,51,51,0.7)]">{note}</div>}
        </div>
    )
}

type ApiResponse = {
    created_at: string;
    id: number,
    note: string,
    sets: {reps: number, weight: number}[]
}

export default function ExerciseData({exerciseName}: ExerciseDataProps) {
    const api = useMemo(() => getApi(), []);

    const [exerciseData, setExerciseData] = useState<ApiResponse[]>([])
    const [isMoreData, setIsMoreData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function getExerciseData() {
        if (isLoading) return
        setIsLoading(true)

        try {
            let params = {
                exercise_name: exerciseName,
                before: new Date().toISOString(),
            }

            if (exerciseData.length > 0) {
                params["before"] = exerciseData[exerciseData.length - 1].created_at
                console.log(params["before"])
            }

            const response = await api.get("/exercise/get_data", {
                params
            })

            setExerciseData([...exerciseData, ...response.data])

            if (response.data.length === 5) {
                //response returned max size so there is more data
                setIsMoreData(true)
            } else {
                setIsMoreData(false)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getExerciseData()
    }, [exerciseName, api])

    return (
        <div className="flex flex-col items-center mt-8 gap-2 w-full">
            <p className="font-medium text-lg">Exercise Data</p>
            <div className="flex flex-col items-center gap-2 w-full max-h-96 overflow-y-auto scroll-smooth">
                {exerciseData.map((data, index) => {
                    const date = new Date(data.created_at);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = String(date.getFullYear()).slice(-2);

                    const formattedDate = `${day}/${month}/${year}`;

                    return (
                        <Card key={index} date={formattedDate} sets={data.sets} note={data.note}/>
                    )
                })} 
            </div>
            {isMoreData && <button 
                className="bg-[#D9EAFD] rounded-md p-2 mt-4"
                onClick={() => getExerciseData()}
            >Load More</button>}

            {isLoading && <BeatLoading fill={"#333333"}/>}
        </div> //need to add a laod more button
    )

}