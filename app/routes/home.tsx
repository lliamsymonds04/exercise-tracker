import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Homepage" },
  ];
}

export default function Home() {
    return (
        <div>

        </div>
    )
}