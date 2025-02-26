import { useEffect, useState } from "react";
import type { Route } from "./+types/home";

import api from "~/helpers/api";
import { BounceLoading } from "respinner";
import Alert from "~/components/Alert";

export function meta({}: Route.MetaArgs) {
    return [
		{ title: "Home" },
		{ name: "description", content: "Homepage" },
    ];
}

export default function Home() {
    const [exerciseName, setExerciseName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [exerciseNameList, setExerciseNameList] = useState<string[]>([]);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	

	async function getExerciseNames() {
		try {
			const response = await api.get("/exercise/get_names");

			console.log(response)
			setExerciseNameList(response.data)
		} catch (error) {
			console.error(error);
		}
	}

	async function trackExercise() {
		try {
			const response = await api.post("/exercise/track", {
				exercise_name: exerciseName
			});

			const id = response.data.exercise_id
		} catch (error) {
			console.error(error);
		} finally {
			setTimeout(() => {
				setIsLoading(false)
			},500)
		}
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		setExerciseName(value)

		if (value) {
			const filtered = exerciseNameList.filter((item) =>
			  item.toLowerCase().startsWith(value.toLowerCase())
			);
			setSuggestions(filtered);
		} else {
			setSuggestions([]);
		}
	}

	function handleSelect(value: string) {
		setExerciseName(value);

		setSuggestions([]);
	}

	useEffect(() => {
		setExerciseName("")

		getExerciseNames()
	}, [])

    return (
        <div className="flex flex-col items-center h-screen space-y-4 w-screen">
            <h1 className="text-6xl w-lg font-bold drop-shadow-md text-center font-serif mb-8 mt-4">Track Track Track!</h1>

            <input
                className="bg-gray-200 rounded-2xl h-10 w-[80%] max-w-[20rem] p-2 text-center font-serif text-xl"
                type="text"
                placeholder="Exercise Name"
                value={exerciseName}
                onChange={handleInputChange}
            />
			{suggestions.length > 0 && 
				<div className="w-[50%] max-w-[10rem] flex flex-col items-center">
					<p className="text-sm font-serif mb-2">Suggestions:</p>

					<div className="w-full flex flex-col border-2 border-[#333333] rounded-xl">
						{suggestions.map((item, index) => (
							<div
								key={index}
								className={`cursor-pointer text-center font-serif border-[#333333] hover:bg-[rgba(51,51,51,0.1)]  ${index < suggestions.length - 1 ? "border-b-2" : ""}`}
								onClick={() => handleSelect(item)}
							>
								<p className="opacity-100">{item}</p>
							</div>
						))}
					</div>
				</div>
			}
			
			{exerciseName != "" && 
				<div className="w-[50%] max-w-[10rem] mt-10 flex flex-col">
					<button
						className="bg-[#D9EAFD] rounded-2xl h-10 font-serif font-bold cursor-pointer active:scale-95 active:shadow-inner"
						onClick={() => {
							if (isLoading) return

							setIsLoading(true)

							trackExercise()
						}}
					>Track</button>
				</div>
			}
			{isLoading && <BounceLoading fill="#333333"/>}
			<Alert colour="#333333" title="Attention!" text="Successfully tracked!" iconText={'\u2713'}/>
        </div>
    )
}