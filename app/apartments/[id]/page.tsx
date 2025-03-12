import Link from "next/link"
import { ArrowLeft, Building, Calendar, Download, Home, MapPin, Maximize, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RobotStatusIndicator from "@/components/robot-status-indicator"
import RoomMap from "@/components/room-map"

export default function ApartmentDetail({ params }: { params: { id: string } }) {
  // Dans une application réelle, vous récupéreriez les données de l'appartement à partir d'une API
  const apartmentId = Number.parseInt(params.id)
  const apartment = apartments.find((apt) => apt.id === apartmentId) || apartments[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{apartment.name}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {apartment.address}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RobotStatusIndicator />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Télécharger le rapport
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Informations</CardTitle>
            <CardDescription>Détails de l'appartement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground">{apartment.type || "Appartement"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Maximize className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Surface</p>
                <p className="text-sm text-muted-foreground">{apartment.area} m²</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Home className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Pièces</p>
                <p className="text-sm text-muted-foreground">{apartment.rooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Date de cartographie</p>
                <p className="text-sm text-muted-foreground">{apartment.mappedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Ruler className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Précision</p>
                <p className="text-sm text-muted-foreground">98%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Cartographie</CardTitle>
            <CardDescription>Plan de l'appartement généré par le robot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] w-full bg-muted rounded-md overflow-hidden">
              <RoomMap apartmentId={apartment.id} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rooms">
        <TabsList className="mb-4">
          <TabsTrigger value="rooms">Pièces</TabsTrigger>
          <TabsTrigger value="issues">Problèmes détectés</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        <TabsContent value="rooms">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Card key={room.id}>
                <div className="aspect-video bg-muted">
                  <img
                    src={room.image || "/placeholder.svg"}
                    alt={`Aperçu de ${room.name}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{room.name}</CardTitle>
                  <CardDescription>{room.area} m²</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    {room.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>Problèmes détectés</CardTitle>
              <CardDescription>Le robot a identifié les problèmes suivants lors de la cartographie</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {issues.map((issue, index) => (
                  <li key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-white ${issue.severity === "high" ? "bg-destructive" : issue.severity === "medium" ? "bg-amber-500" : "bg-blue-500"}`}
                    >
                      {issue.severity === "high" ? "!" : issue.severity === "medium" ? "!!" : "i"}
                    </div>
                    <div>
                      <p className="font-medium">{issue.title}</p>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                      <p className="text-sm mt-1">
                        Localisation: <span className="font-medium">{issue.location}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique des cartographies</CardTitle>
              <CardDescription>Historique des inspections réalisées par le robot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {history.map((entry, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{entry.date}</p>
                      <p className="text-sm text-muted-foreground">{entry.description}</p>
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          Rapport
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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

const rooms = [
  {
    id: 1,
    name: "Salon",
    area: 25,
    image: "/placeholder.svg?height=150&width=300",
    features: ["Parquet en bon état", "Fenêtre double vitrage", "Prise électrique x4", "Luminaire central"],
  },
  {
    id: 2,
    name: "Chambre principale",
    area: 16,
    image: "/placeholder.svg?height=150&width=300",
    features: ["Parquet en bon état", "Fenêtre double vitrage", "Placard intégré", "Prise électrique x3"],
  },
  {
    id: 3,
    name: "Cuisine",
    area: 12,
    image: "/placeholder.svg?height=150&width=300",
    features: ["Carrelage", "Évier inox", "Hotte aspirante", "Arrivée d'eau", "Prise électrique x5"],
  },
  {
    id: 4,
    name: "Salle de bain",
    area: 8,
    image: "/placeholder.svg?height=150&width=300",
    features: ["Carrelage mural", "Baignoire", "Lavabo", "VMC", "Sèche-serviette"],
  },
  {
    id: 5,
    name: "Toilettes",
    area: 2,
    image: "/placeholder.svg?height=150&width=300",
    features: ["Carrelage", "WC suspendu", "VMC"],
  },
  {
    id: 6,
    name: "Entrée",
    area: 5,
    image: "/placeholder.svg?height=150&width=300",
    features: ["Parquet", "Interphone", "Placard"],
  },
]

const issues = [
  {
    title: "Humidité détectée",
    description: "Traces d'humidité sur le mur nord de la salle de bain, près de la douche.",
    location: "Salle de bain",
    severity: "medium",
  },
  {
    title: "Fissure murale",
    description: "Fissure de 45cm sur le mur est du salon, potentiellement structurelle.",
    location: "Salon",
    severity: "high",
  },
  {
    title: "Prise électrique défectueuse",
    description: "La prise près de la fenêtre présente des signes d'usure et de surchauffe.",
    location: "Chambre principale",
    severity: "high",
  },
  {
    title: "Parquet endommagé",
    description: "Lames de parquet gondolées sur environ 1m² près de l'entrée de la cuisine.",
    location: "Salon",
    severity: "medium",
  },
  {
    title: "Joint silicone usé",
    description: "Le joint silicone autour de la baignoire est noirci et présente des signes de moisissure.",
    location: "Salle de bain",
    severity: "low",
  },
]

const history = [
  {
    date: "12/05/2024",
    description: "Cartographie complète de l'appartement",
  },
  {
    date: "15/02/2024",
    description: "Inspection de routine trimestrielle",
  },
  {
    date: "10/11/2023",
    description: "Inspection de routine trimestrielle",
  },
  {
    date: "05/08/2023",
    description: "Inspection de routine trimestrielle",
  },
  {
    date: "20/05/2023",
    description: "Cartographie initiale de l'appartement",
  },
]

