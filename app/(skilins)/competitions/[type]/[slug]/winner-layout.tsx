import { Check, Crown, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface WinnerProps {
  Winners: [];
}

const WinnerLayout: FC<WinnerProps> = ({ Winners }) => {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge variant={"outline"}>
            <Crown width={14} className="mr-2" />
            Winner
          </Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              The Winner of Competition
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Celebrating every victory while inspiring growth and determination
              in our journey to success.
            </p>
          </div>
          <div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
            <Card className="w-full rounded-md ">
              <CardHeader>
                <AspectRatio ratio={3 / 4}>
                  <Image
                    src="https://images.unsplash.com/photo-1731576089080-8c1eda0a3536?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="image"
                    className="rounded-md"
                  />
                </AspectRatio>
              </CardHeader>
              <CardContent>
                <h1>juara 3</h1>
              </CardContent>
            </Card>
            <Card className="w-full shadow-2xl rounded-md">
              <CardHeader></CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card className="w-full rounded-md">
              <CardHeader></CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinnerLayout;
