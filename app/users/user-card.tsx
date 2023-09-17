"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { Database } from "@/lib/schema";
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function UserCard(profile: Profile) {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
              <AvatarFallback>{profile.display_name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {profile.display_name}
          </AccordionTrigger>
          <AccordionContent>
            <div>Email: {profile.email}</div>
            <div>Bio: {profile.biography ? profile.biography : "N/A"}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
