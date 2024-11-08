import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function JudgeLayout() {
  return (
    <section className="py-6">
      <div className="container flex flex-col items-center text-center gap-4">
        <Badge variant="outline">
          <Users width={14} className="mr-2" />
          Judge
        </Badge>

        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
            The mentors guiding your creative journey
          </h2>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
            {`Offering thoughtful insights and guidance to enhance every student's
            creative expression.`}
          </p>
        </div>
      </div>
      <div className="container mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-start">
          <Avatar className="size-20 lg:size-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-medium">Name</p>
          <p className="text-zinc-600">Role</p>
          <p className="py-3 text-sm text-zinc-600">
            Elig doloremque mollitia fugiat omnis!
          </p>
          <div className="mt-2 flex gap-4"></div>
        </div>
      </div>
    </section>
  );
}
