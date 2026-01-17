'use client';

import ProblemCard from "@/app/components/ProblemCard";
import { useEffect, useState } from "react";

export default function LiveSession() {
    return (
        <div className="w-full">
            <div className="flex justify-center mt-8">
                <ProblemCard />
            </div>
        </div>
    )
}