"use client";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import CardContent from "./card-content";
import EditSpecies from "./edit-species";
type Species = Database["public"]["Tables"]["species"]["Row"];

interface CardProps {
  species: Species;
  userId: string;
}

export default function SpeciesCard({ species, userId }: CardProps) {
  if (species.author != userId) {
    //If the user did not create the species card
    return (
      <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
        {species.image && (
          <div className="relative h-40 w-full">
            <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
          </div>
        )}
        <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
        <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
        <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
        <div className="container">
          <CardContent species={species} />
        </div>
      </div>
    );
  }

  //If the user created the species card
  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      {/* Detailed Species View */}
      <div className="container">
        <CardContent species={species} />
        <div className="container">
          <EditSpecies species={species} />
        </div>
      </div>
    </div>
  );
}
