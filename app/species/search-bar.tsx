"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

//API Response outline
interface ApiResponse {
  thumbnail?: {
    source?: string;
  };
  extract?: string;
}

const SearchBar = ({ updateResults }: { updateResults: (data: string[]) => void }) => {
  const [query, setQuery] = useState<string>("");
  const { toast } = useToast();

  const fetchArticle = async () => {
    //Empty input
    if (query.length < 1) {
      toast({
        title: "INVALID INPUT",
        description: "Please input a valid Wikipedia article.",
      });
      return;
    }

    //Make API fetch
    const link = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;

    try {
      const response = await fetch(link);
      if (response.status === 200) {
        // Article exists
        const data: ApiResponse = (await response.json()) as ApiResponse;
        if (data) {
          //Update state based on search results
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
        placeholder="Search Article Name..."
      />
      <Button onClick={() => void fetchArticle()}>Autofill</Button>
    </div>
  );
};

export default SearchBar;
