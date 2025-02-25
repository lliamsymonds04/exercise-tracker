type PopupProps = {
    colour: string
    title: string
    text: string;
    iconText?: string;
}

function Alert({colour, title, text, iconText}: PopupProps) {
    return (
        <div className="flex w-[70%] max-w-[20rem] h-fit flex-row border-2 rounded-md items-center drop-shadow-lg" style={{borderColor: colour}}>
            <div className="ml-3">
                <p className="text-xl font-bold" style={{color: colour}}>{iconText}</p>
            </div>
            <div className="flex flex-col ml-3">
                <p className="text-md font-serif font-medium" style={{color: colour}}>{title}</p>
                <p className="text-sm font-serif" style={{color: colour}}>{text}</p>
            </div>
        </div>
    )
}

export default Alert
