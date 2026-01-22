'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { User, Settings, CreditCard, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import SignInButton from "./SignInButton";

export function ProfileDropDownMenu() {
  const {user, loading, signOut} = useAuth();

  if (loading) return (<p>Loading ...</p>);
  
  if (!user) return <SignInButton />
    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Added cursor-pointer and a subtle ring on hover for better UX */}
        <Avatar className="h-9 w-9 cursor-pointer transition-all hover:ring-2 hover:ring-primary/20">
          <AvatarImage src={user?.user_metadata.avatar_url} alt={user?.user_metadata.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">AB</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      
      {/* 'align="end"' keeps the menu from going off-screen on the right. 
         'sideOffset={8}' gives it some breathing room from the header.
      */}
      <DropdownMenuContent className="w-64 p-2" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 py-1">
            <p className="text-sm font-semibold leading-none">{user?.user_metadata.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {`${user?.user_metadata.name}@go-dsa.com`}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="my-1" />
        
        <DropdownMenuGroup>
          <DropdownMenuItem className="py-2.5 cursor-pointer flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2.5 cursor-pointer flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
            <span>My Progress</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2.5 cursor-pointer flex items-center gap-2">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="my-1" />
        
        <DropdownMenuItem className="py-2.5 cursor-pointer flex items-center gap-2 text-destructive">
          <LogOut className="w-4 h-4" />
          <Button variant='destructive' onClick={signOut}>Sign Out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}