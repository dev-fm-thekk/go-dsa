import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Trophy, LineChart } from "lucide-react";

export default function MobileProgress() {
  return (
    <div className="block sm:hidden p-4">
      <Card className="w-full max-w-lg relative overflow-hidden border-border/50 shadow-lg transition-all hover:shadow-xl">
        
        {/* Subtle Decorative Background Glow */}
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <LineChart className="w-4 h-4 text-primary" />
            <CardTitle className="text-xl font-bold tracking-tight">Your Progress</CardTitle>
          </div>
          <CardDescription>Quick overview of your journey</CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            
            {/* Streak Item */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/30 border border-muted-foreground/5 transition-colors hover:bg-muted/50">
              <div className="flex items-center gap-1.5 mb-1">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500/20" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Streak</span>
              </div>
              <span className="text-2xl font-black text-foreground tabular-nums">0</span>
            </div>

            {/* Level Item */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/30 border border-muted-foreground/5 transition-colors hover:bg-muted/50">
              <div className="flex items-center gap-1.5 mb-1">
                <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Level</span>
              </div>
              <span className="text-lg font-bold text-primary italic">Master</span>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}