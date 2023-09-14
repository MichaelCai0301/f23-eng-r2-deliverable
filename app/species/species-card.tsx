"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard(species: Species) {
  const [open, setOpen] = useState<boolean>(false);

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="mt-3 w-full">Learn More</Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{species.common_name}</DialogTitle>
                <DialogHeader>Scientific Name: {species.scientific_name}</DialogHeader>
                <DialogHeader>Kingdom: {species.kingdom}</DialogHeader>
                <DialogHeader>Total Population: {species.total_population}</DialogHeader>
                <DialogDescription>{species.description}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button variant="outline" size="default">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
