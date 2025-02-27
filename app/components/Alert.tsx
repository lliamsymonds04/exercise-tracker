import { useState } from "react"

export function useAlertManager() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [isError, setIsError] = useState(false);

    return { title, setTitle, text, setText, visibility, setVisibility, isError, setIsError };
}

type AlertProps = {
    alertManager: ReturnType<typeof useAlertManager>;
    colour: string;
    iconText: string;
};

export function Alert({ alertManager, colour, iconText }: AlertProps) {
    if (!alertManager.visibility) return null;

    return (
        <div
            className="flex w-[70%] max-w-[20rem] h-fit flex-row border-2 rounded-md items-center drop-shadow-lg mt-4"
            style={{ borderColor: colour }}
        >
            <div className="ml-3">
                <p className="text-xl font-bold" style={{ color: colour }}>
                    {iconText}
                </p>
            </div>
            <div className="flex flex-col ml-3">
                <p className="text-md font-serif font-medium" style={{ color: colour }}>
                    {alertManager.title}
                </p>
                <p className="text-sm font-serif ml-3" style={{ color: colour }}>
                    {alertManager.text}
                </p>
            </div>
        </div>
    );
}

export function alertHelper(alertManager: ReturnType<typeof useAlertManager>, isError: boolean, title: string, message: string) {
    alertManager.setIsError(isError);
    alertManager.setTitle(title);   
    alertManager.setText(message);
    alertManager.setVisibility(true);
    setTimeout(() => {
        alertManager.setVisibility(false);
    }, 5000);
}