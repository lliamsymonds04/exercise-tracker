import React from "react";
import { motion } from "motion/react"

interface ToggleButtonProps {
    backgroundColour: string,
    activeColour: string,
    toggle: boolean,
    setToggle: React.Dispatch<React.SetStateAction<boolean>>,
    option1: string,
    option2: string
}

function ToggleButton({backgroundColour, activeColour, toggle, setToggle, option1, option2}: ToggleButtonProps ) {
    return (<div className={`w-full h-10 relative rounded-2xl`} style={{backgroundColor: backgroundColour}}>
        <button 
            className="w-full h-full absolute cursor-pointer z-50"
            onClick={() => setToggle(!toggle)}
        />
        <motion.div className={`absolute h-full w-1/2 rounded-2xl drop-shadow-md`} animate={{x: toggle ? "100%" : 0}} style={{backgroundColor: activeColour}}/>
        <p className="text-2xl font-serif w-1/2 text-center absolute top-1/2 -translate-y-1/2">{option1}</p>
        <p className="text-2xl font-serif w-1/2 text-center absolute left-1/2 top-1/2 -translate-y-1/2">{option2}</p>
    </div>)
}

export default ToggleButton;