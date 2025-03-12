import Link from "next/link"
import { Building, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import RobotStatusIndicator from "@/components/robot-status-indicator"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Robot État des Lieux</h1>
          <p className="text-muted-foreground">Consultez les données de cartographie de vos appartements</p>
        </div>
        <RobotStatusIndicator />
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Appartements récents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment) => (
            <Card key={apartment.id} className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <img
                  src={apartment.image || "/placeholder.svg"}
                  alt={`Aperçu de ${apartment.name}`}
                  className="object-cover w-full h-full"
                />
                {apartment.isNew && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                    Nouveau
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {apartment.name}
                </CardTitle>
                <CardDescription>{apartment.address}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Cartographié le {apartment.mappedDate}</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Surface:</span> {apartment.area} m²
                </div>
                <div className="mt-1 text-sm">
                  <span className="font-medium">Pièces:</span> {apartment.rooms}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/apartments/${apartment.id}`}>Voir détails</Link>
                </Button>
                <Button variant="secondary">
                  <Download className="mr-2 h-4 w-4" />
                  Rapport
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Tous les appartements</h2>
          <Button variant="outline">Filtrer</Button>
        </div>
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Nom</th>
                  <th className="px-4 py-3 text-left font-medium">Adresse</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Surface</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apartments.map((apartment) => (
                  <tr key={apartment.id} className="border-b">
                    <td className="px-4 py-3">{apartment.name}</td>
                    <td className="px-4 py-3">{apartment.address}</td>
                    <td className="px-4 py-3">{apartment.mappedDate}</td>
                    <td className="px-4 py-3">{apartment.area} m²</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/apartments/${apartment.id}`}>
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Voir détails</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Télécharger rapport</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

const apartments = [
  {
    id: 1,
    name: "Appartement Montmartre",
    address: "15 Rue Lepic, 75018 Paris",
    mappedDate: "12/05/2024",
    area: 68,
    rooms: 3,
    image: "/placeholder.svg?height=200&width=400",
    isNew: true,
  },
  {
    id: 2,
    name: "Studio Bastille",
    address: "8 Rue de la Roquette, 75011 Paris",
    mappedDate: "05/05/2024",
    area: 32,
    rooms: 1,
    image: "/placeholder.svg?height=200&width=400",
    isNew: false,
  },
  {
    id: 3,
    name: "Duplex République",
    address: "25 Boulevard Voltaire, 75011 Paris",
    mappedDate: "28/04/2024",
    area: 85,
    rooms: 4,
    image: "/placeholder.svg?height=200&width=400",
    isNew: false,
  },
  {
    id: 4,
    name: "Loft Marais",
    address: "12 Rue des Archives, 75004 Paris",
    mappedDate: "20/04/2024",
    area: 75,
    rooms: 2,
    image: "/placeholder.svg?height=200&width=400",
    isNew: false,
  },
  {
    id: 5,
    name: "Appartement Opéra",
    address: "3 Rue Scribe, 75009 Paris",
    mappedDate: "15/04/2024",
    area: 92,
    rooms: 4,
    image: "/placeholder.svg?height=200&width=400",
    isNew: false,
  },
  {
    id: 6,
    name: "Studio Saint-Michel",
    address: "7 Rue de la Huchette, 75005 Paris",
    mappedDate: "10/04/2024",
    area: 28,
    rooms: 1,
    image: "/placeholder.svg?height=200&width=400",
    isNew: false,
  },
]

