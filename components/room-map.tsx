"use client"

import { useEffect, useRef, useState } from "react"

export default function RoomMap({ apartmentId }: { apartmentId: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Simuler un chargement
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
      drawApartmentMap(ctx, canvas.width, canvas.height, apartmentId)
    }, 1000)

    return () => clearTimeout(timer)
  }, [apartmentId])

  // Fonction pour dessiner la carte de l'appartement
  const drawApartmentMap = (ctx: CanvasRenderingContext2D, width: number, height: number, id: number) => {
    // Effacer le canvas
    ctx.clearRect(0, 0, width, height)

    // Définir les couleurs
    const wallColor = "#333"
    const floorColor = "#f5f5f5"
    const doorColor = "#8b4513"
    const windowColor = "#add8e6"
    const furnitureColor = "#a0a0a0"

    // Dessiner le fond (sol)
    ctx.fillStyle = floorColor
    ctx.fillRect(0, 0, width, height)

    // Dessiner les murs extérieurs
    ctx.strokeStyle = wallColor
    ctx.lineWidth = 8
    ctx.strokeRect(20, 20, width - 40, height - 40)

    // Dessiner les pièces en fonction de l'ID de l'appartement
    if (id === 1) {
      // Appartement Montmartre (3 pièces)
      drawRoom(ctx, 20, 20, width * 0.6, height * 0.5, "Salon", true)
      drawRoom(ctx, 20, 20 + height * 0.5, width * 0.3, height * 0.5 - 20, "Chambre 1")
      drawRoom(ctx, 20 + width * 0.3, 20 + height * 0.5, width * 0.3, height * 0.5 - 20, "Chambre 2")
      drawRoom(ctx, 20 + width * 0.6, 20, width * 0.4 - 20, height - 40, "Cuisine/SDB", false, true)
    } else if (id === 2) {
      // Studio Bastille (1 pièce)
      drawRoom(ctx, 20, 20, width * 0.7 - 20, height - 40, "Pièce principale", true)
      drawRoom(ctx, 20 + width * 0.7 - 20, 20, width * 0.3, height - 40, "SDB/Cuisine", false, true)
    } else {
      // Appartement par défaut
      drawRoom(ctx, 20, 20, width * 0.5, height * 0.4, "Salon", true)
      drawRoom(ctx, 20, 20 + height * 0.4, width * 0.5, height * 0.6 - 20, "Chambre")
      drawRoom(ctx, 20 + width * 0.5, 20, width * 0.5 - 20, height * 0.6, "Cuisine", false, true)
      drawRoom(ctx, 20 + width * 0.5, 20 + height * 0.6, width * 0.5 - 20, height * 0.4 - 20, "SDB")
    }

    // Ajouter une légende
    ctx.fillStyle = "#333"
    ctx.font = "12px sans-serif"
    ctx.fillText("Légende:", width - 120, height - 80)

    // Dessiner les éléments de légende
    ctx.fillStyle = wallColor
    ctx.fillRect(width - 120, height - 70, 15, 15)
    ctx.fillStyle = "#333"
    ctx.fillText("Murs", width - 100, height - 58)

    ctx.fillStyle = doorColor
    ctx.fillRect(width - 120, height - 50, 15, 15)
    ctx.fillStyle = "#333"
    ctx.fillText("Portes", width - 100, height - 38)

    ctx.fillStyle = windowColor
    ctx.fillRect(width - 120, height - 30, 15, 15)
    ctx.fillStyle = "#333"
    ctx.fillText("Fenêtres", width - 100, height - 18)
  }

  // Fonction pour dessiner une pièce
  const drawRoom = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    name: string,
    hasDoor = false,
    hasWindow = false,
  ) => {
    // Dessiner les murs intérieurs
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 4
    ctx.strokeRect(x, y, width, height)

    // Ajouter le nom de la pièce
    ctx.fillStyle = "#333"
    ctx.font = "14px sans-serif"
    ctx.fillText(name, x + 10, y + 20)

    // Ajouter une porte si nécessaire
    if (hasDoor) {
      ctx.fillStyle = "#8b4513"
      ctx.fillRect(x + width / 2 - 15, y + height - 4, 30, 8)
    }

    // Ajouter une fenêtre si nécessaire
    if (hasWindow) {
      ctx.fillStyle = "#add8e6"
      ctx.fillRect(x + width - 8, y + height / 2 - 20, 8, 40)
    }

    // Ajouter quelques meubles aléatoires
    ctx.fillStyle = "#a0a0a0"

    // Table ou lit
    ctx.fillRect(x + width / 4, y + height / 4, width / 2, height / 3)

    // Chaise ou table de chevet
    ctx.fillRect(x + width / 6, y + height / 2, width / 10, width / 10)
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Chargement de la carte...</p>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} width={800} height={600} className="w-full h-full" />
    </div>
  )
}

