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
import { useState } from "react";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function CardContent({ species }: { species: Species }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* Detailed Species View */}
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
    </>
  );
}
