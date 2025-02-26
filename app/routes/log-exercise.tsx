import type { Route } from "./+types/log-exercise";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Log Exercise" },
        { name: "description", content: "log exercise" },
    ];
}

export default function LogExercise() {
    const params = useParams();
    const exerciseName = params["exercise-name"];
    const exerciseId = params["exercise-id"];

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-4xl mb-4 font-medium">Log Exercise!</h1>
            <p>Exercise Name: {exerciseName}</p>
            
        </div>
    )
}
