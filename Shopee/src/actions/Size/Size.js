import { useEffect, useState } from "react";

export function SizeScale() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const [size, setSize] = useState(
        { height: width / height, width: height / width }
    );

    useEffect(() => {
        const setWidth = () => {
            setSize({ height: width / height, width: height / width })

        }
        window.addEventListener('resize', setWidth)
        return () => {
            window.removeEventListener('resize', setWidth)

        }
    }, [width]);

    return size;
}
