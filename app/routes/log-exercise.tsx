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
        <div>
            <h1>Log Exercise</h1>
            <p>Exercise Name: {exerciseName}</p>
            <p>Exercise ID: {exerciseId}</p>
        </div>
    )
}
