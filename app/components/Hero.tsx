import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Zap } from "lucide-react"; // Added for visual interest
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex justify-center p-8 min-h-75 items-center">
      {/* Added relative and group for hover effects */}
      <Card className="w-full max-w-lg relative overflow-hidden border-border/50 shadow-xl transition-all hover:shadow-2xl">
        
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Hello, Abhiram
              </CardTitle>
              <CardDescription className="text-base mt-1">
                 Code, test, and score.
              </CardDescription>
            </div>
            <div className="bg-primary/5 p-2 rounded-full">
               <Zap className="w-5 h-5 text-primary animate-pulse" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-muted/30 border border-muted-foreground/5">
            <div className="flex items-center gap-3">
              <Badge
                variant="destructive"
                className="px-2 py-0.5 rounded-md uppercase tracking-widest text-[10px] font-black shadow-sm"
              >
                Live
              </Badge>
              <h3 className="text-xl font-medium">
                Day <span className="font-black text-primary tabular-nums">0</span>
              </h3>
            </div>

            <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              Arrays, Two-pointers, Sliding Window
            </p>
          </div>

          <Button asChild className="w-full h-12 text-md font-semibold shadow-lg shadow-primary/20">
            <Link href="/session/live" className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Start your session
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}