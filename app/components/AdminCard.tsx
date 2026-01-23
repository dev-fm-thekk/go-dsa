'use client';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User } from "@supabase/supabase-js";

interface AdminCardProps {
    user: User | null;
}

export default function AdminCard({ user }: AdminCardProps) {
    return (
        <Card className="shadow-lg border-muted">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Coordinator Dashboard</CardTitle>
                    <CardDescription>
                        Manage and oversee your assigned tasks
                    </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 uppercase tracking-wider">
                    Coordinator
                </Badge>
            </CardHeader>
            
            <Separator className="my-4" />
            
            <CardContent>
                <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Logged in as</p>
                        <p className="text-lg font-semibold">{user?.email}</p>                            
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="text-sm">
                            <span className="text-muted-foreground">Status:</span> 
                            <span className="ml-2 font-medium text-green-600">Active</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-muted-foreground">Access Level:</span> 
                            <span className="ml-2 font-medium">Standard</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
