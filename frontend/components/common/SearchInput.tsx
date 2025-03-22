'use client'
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type SearchInputProps = {
    onSearch: (query: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query") || "";
    const [query, setQuery] = useState<string>(initialQuery);

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="flex w-fit max-sm:w-full overflow-hidden rounded-md max-w-md border border-gray-400">
            <Input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9 w-[300px] border-none focus:ring-0"
            />
            <Button size="sm" type="submit" className="h-9 w-9 bg-primary text-white p-2 flex items-center justify-center">
                <Search size={20} />
            </Button>
        </form>
    );
};

export default SearchInput;
