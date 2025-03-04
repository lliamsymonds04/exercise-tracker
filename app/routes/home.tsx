import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/home";

import { BounceLoading } from "respinner";
import getApi from "~/helpers/api";


export function meta({}: Route.MetaArgs) {
    return [
		{ title: "Home" },
		{ name: "description", content: "Homepage" },
    ];
}

export default function Home() {
    const navigate = useNavigate();
	const api = useMemo(() => getApi(), []);

    const [exerciseName, setExerciseName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [exerciseNameList, setExerciseNameList] = useState<string[]>([]);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	

	async function getExerciseNames() {
		try {
			const response = await api.get("/exercise/get_names");

			setExerciseNameList(response.data)
		} catch (error) {
			console.error(error);
		}
	}

	async function trackExercise() {
		navigate("/log-exercise/" + exerciseName)
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

	async function logout() {
		try {
			const response = await api.get("/logout");

			if (response.status === 200) {
				navigate("/login", { replace: true });
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		setExerciseName("")

		getExerciseNames()
	}, [api])

    return (
        <div className="reltaive flex flex-col items-center h-screen space-y-4 w-screen">
            <h1 className="text-6xl w-lg font-bold drop-shadow-md text-center font-serif mb-8 mt-4">Track Track Track!</h1>

			<div className="bg-gray-200 rounded-md h-fit w-[80%] max-w-[20rem] p-3 flex flex-col items-center">
				<input
					className="w-full text-xl"
					type="text"
					placeholder="Exercise Name"
					value={exerciseName}
					onChange={handleInputChange}
				/>
				{suggestions.length > 0 && 
					<div className="flex flex-col items-center w-full">
						<div className="bg-[#333333] h-0.5 w-full opacity-70 mt-1"/>
						{suggestions.map((item, index) => {
							return (
								<button
									key={index}
									className={`cursor-pointer w-[90%] text-left hover:bg-[rgba(51,51,51,0.1)] `}
									onClick={() => handleSelect(item)}
								>
									{item}
								</button>
							)
						})}
					</div>
				}
			</div>
			
			{exerciseName != "" && 
				<div className="w-[50%] max-w-[10rem] mt-1 flex flex-col">
					<button
						className="bg-[#D9EAFD] rounded-md h-10 font-serif font-bold cursor-pointer active:scale-95 active:shadow-inner"
						onClick={() => {
							if (isLoading) return

							setIsLoading(true)

							trackExercise()
						}}
					>Track</button>
				</div>
			}
			{isLoading && <BounceLoading fill="#333333"/>}

			<button
					className="absolute bottom-10 bg-[#FF7F7F] px-3 py-1 rounded-xl cursor-pointer font-bold text-lg active:scale-90"
				onClick={() => {
					logout()				
				}}
			>Logout</button>
			
        </div>
    )
}