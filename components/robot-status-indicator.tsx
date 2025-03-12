"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Bot, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function RobotStatusIndicator() {
  const [status, setStatus] = useState<"idle" | "mapping" | "processing">("idle")
  const [currentLocation, setCurrentLocation] = useState<string | null>(null)

  // Simuler un changement d'état du robot toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: ("idle" | "mapping" | "processing")[] = ["idle", "mapping", "processing"]
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      setStatus(randomStatus)

      if (randomStatus === "mapping") {
        const locations = ["Appartement Montmartre", "Studio Bastille", "Duplex République", "Loft Marais"]
        setCurrentLocation(locations[Math.floor(Math.random() * locations.length)])
      } else {
        setCurrentLocation(null)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Badge
              variant={status === "idle" ? "outline" : status === "mapping" ? "destructive" : "secondary"}
              className="flex items-center gap-2 px-3 py-1.5"
            >
              {status === "mapping" || status === "processing" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
              <span className="font-medium">
                {status === "idle" && "Robot inactif"}
                {status === "mapping" && "Cartographie en cours"}
                {status === "processing" && "Traitement des données"}
              </span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {status === "idle" && "Le robot est actuellement inactif et disponible pour une nouvelle mission"}
          {status === "mapping" && `Le robot est en train de cartographier: ${currentLocation}`}
          {status === "processing" && "Le robot a terminé la cartographie et traite les données collectées"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

