export default function debounce(setState: React.Dispatch<React.SetStateAction<boolean>>, delay: number) {
    setState(true)
    setTimeout(() => {
        setState(false)
    }, delay)
}