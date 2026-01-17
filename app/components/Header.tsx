import { Button } from "@/components/ui/button";
import { ProfileDropDownMenu } from "./ProfileDropMenu";
import { ModeToggle } from "./DarkModeToggle";
import { Flame, Trophy } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 h-16 max-w-7xl mx-auto">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link href='/' className="flex gap-2 py-3">
              <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center">
                 <span className="text-primary-foreground font-black text-xs">GO</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight">
               <span className="text-primary">DSA</span>
              </h1>
          </Link>
        </div>

        {/* Desktop Navigation / Stats */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Compact Streak Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 transition-colors hover:bg-muted">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500/10" />
            <span className="text-xs font-bold tabular-nums">0</span>
          </div>

          {/* Compact Level Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 transition-colors hover:bg-muted">
            <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500/10" />
            <span className="text-xs font-bold text-primary italic">Master</span>
          </div>

          <div className="h-4 w-[1px] bg-border mx-1" /> {/* Vertical Divider */}
          
          <ModeToggle />
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <ProfileDropDownMenu />
        </div>
      </div>
    </header>
  );
}