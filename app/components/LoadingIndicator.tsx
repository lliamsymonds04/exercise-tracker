import { motion } from 'framer-motion';

function LoadingIndicator({isLoading}: {isLoading: boolean}) {
    return (
        <div>
            {isLoading && <div className='w-32 h-4 bg-[#333333] flex overflow-hidden rounded-full'>
                <motion.div 
                    className='bg-[#D9EAFD] h-4'
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: 1, // Adjust speed
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            </div>}
        </div>
    )
}

export default LoadingIndicator