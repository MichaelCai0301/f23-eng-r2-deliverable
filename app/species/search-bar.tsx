import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState, type FC } from "react";

interface SearchBarProps {
  // Define the expected prop types
  updateResults: (data: string[]) => void;
}
interface ApiResponse {
  thumbnail?: {
    source?: string;
  };
  extract?: string;
}
const SearchBar: FC<SearchBarProps> = ({ updateResults }) => {
  const [query, setQuery] = useState<string>("");
  const { toast } = useToast();

  //make API fetch
  const fetchArticle = async () => {
    //empty input
    if (query.length < 1) {
      toast({
        title: "INVALID INPUT",
        description: "Please input a valid Wikipedia article.",
      });
      return;
    }

    const link = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;

    try {
      const response = await fetch(link);
      if (response.status === 200) {
        // Article exists
        const data: ApiResponse = (await response.json()) as ApiResponse;
        if (data) {
          //update state based on search results
          const imageURL: string = data.thumbnail?.source ?? "";
          const description: string = data.extract ?? "";
          updateResults([imageURL, description]);
        }
      } else if (response.status === 404) {
        // Article does not exist
        toast({
          title: "PAGE NOT FOUND",
          description: "Wikipedia article not found.",
        });
      } else {
        //Other HTTP error
        if (response.status) {
          return toast({
            title: "HTTP Error",
            description: response.status.toString(),
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        return toast({
          title: "Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        className="w-80 px-3 py-2"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        placeholder="Search..."
      />
      <Button onClick={() => void fetchArticle()}>Search</Button>
    </div>
  );
};

export default SearchBar;
