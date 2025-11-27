import { cn } from '@/lib/utils'
import React from 'react'

export default function Spinner({className}) {
    return (
        <div className={cn("w-3 h-3 border-2 border-gray-300 border-t-transparent rounded-full animate-spin", className)}></div>
    )
}
