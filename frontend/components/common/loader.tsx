'use client'
import { ScaleLoader } from "react-spinners";

export const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <ScaleLoader
            color="#01816A"
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="text-primary"
        />
    );
}

export default Loader;
