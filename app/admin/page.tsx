'use client';

import { useAuth } from "@/context/useAuth";
import { useEffect, useState } from "react";
import { authorizeCoordinator } from "@/lib/coordinator/action";
import { createClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";

// Shadcn UI Imports
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Test() {
    const { user, loading } = useAuth();
    const supabase = createClient();
    
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [checkingStatus, setCheckingStatus] = useState<boolean>(true);

    useEffect(() => {
        if (loading) return;
        if (!user) {
            setCheckingStatus(false);
            return; 
        }

        const checkAuthorization = async () => {
            try {
                const result = await authorizeCoordinator(user, supabase);
                if (result.error && result.error === 'unauthorized') {
                    setIsAuthorized(false);
                } else {
                    setIsAuthorized(true);
                }
            } catch (err) {
                console.error("Authorization failed:", err);
                setIsAuthorized(false);
            } finally {
                setCheckingStatus(false);
            }

            if (!isAuthorized) {
                return notFound();
            }
        };

        checkAuthorization();
    }, [user, loading, supabase]);

    if (loading || checkingStatus) {
        return (
            <div className="flex h-[200px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) return notFound();

    return (
        <div className="p-8 max-w-2xl mx-auto">
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
        </div>
    );
}