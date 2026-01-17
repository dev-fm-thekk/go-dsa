import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProfileDropDownMenu } from "./ProfileDropMenu";
import { ModeToggle } from "./DarkModeToggle";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b">
      <div>
        <h1 className="text-2xl font-semibold">go-DSA</h1>
      </div>
      <div className="flex items-center space-x-4">
        <a href="/">
          <Button variant="outline">
            streak: <span>0</span>
          </Button>
        </a>
        <a href="/">
          <Button variant="outline">
            level: <span>Master</span>
          </Button>
        </a>
        <ModeToggle />
      </div>
      <div>
        <ProfileDropDownMenu />
      </div>
    </div>
  );
}
