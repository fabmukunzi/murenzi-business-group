'use client'
import { ScaleLoader } from "react-spinners";

export const Loader = ({ loading, className }: { loading: boolean,className?:string }) => {
    return (
        <ScaleLoader
            color="#01816A"
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
            className={`text-primary ${className}`}
        />
    );
}

export default Loader;
