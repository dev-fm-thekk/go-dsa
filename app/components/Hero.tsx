import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Hero() {
    return (
        <div className="flex justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Hello, Abhiram</CardTitle>
                    <CardDescription>Welcome, to go-DSA. Code, test and score</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}