import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router";
import type { Route } from "./+types/index";

import { BounceLoading } from "respinner";
import getApi from "~/helpers/api";


export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Loading.." },
		{ name: "description", content: "Index" },
	];
}

export default function index() {
    const navigate = useNavigate();
	const api = useMemo(() => getApi(), []);

    async function checkAuth() {
		try {
			const res = await api.get("/me");

			if (res.status === 200) {
				navigate("/home", { replace: true });
			}
		} catch (e) {
			navigate("/login", { replace: true });
		}
	}

    useEffect(() => {
		checkAuth()
    }, [api])

    return (
      	<div className="flex flex-col items-center justify-center h-screen space-y-4">
			<BounceLoading fill="#333333" />
      	</div>
    )
}