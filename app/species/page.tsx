import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { toast } from "@/components/ui/use-toast";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";

export default async function SpeciesList() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  const { data: species } = await supabase.from("species").select("*");

  //User entered procted route -> authenticated
  const { data: userAuthStatus } = await supabase.from("profiles").select("authenticated").eq("id", session.user.id);
  if (userAuthStatus?.[0]) {
    if (!userAuthStatus[0].authenticated) {
      const { error } = await supabase.from("profiles").update({ authenticated: true }).eq("id", session.user.id);
      //Error in updating auth status
      if (error) {
        return toast({
          title: "Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  } else {
    return toast({
      title: "Something went wrong.",
      description: "Error in receiving auth status.",
      variant: "destructive",
    });
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog key={new Date().getTime()} userId={session.user.id} />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {species?.map((species) => <SpeciesCard key={species.id} species={species} userId={session.user.id} />)}
      </div>
    </>
  );
}
