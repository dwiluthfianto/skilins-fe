import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet } from "lucide-react";

export default function GuideLayout() {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge variant={"outline"}>
            <FileSpreadsheet width={14} className="mr-2" />
            Guide
          </Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              The Guide of Competition
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Comprehensive resources and expert tips to empower participants
              every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
