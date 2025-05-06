import { FileX2 } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    description?: string;
    action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No Data Available",
    description = "There's nothing to display here just yet.",
    action,
}) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-100 p-4 rounded-full mb-6">
                <FileX2 className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
};

export default EmptyState;
