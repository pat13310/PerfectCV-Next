import { Metadata } from "next"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "Modifier CV - PerfectCV",
    description: "Modifier votre CV",
}

export default function EditCVPage() {
    return (
        <div className="container mx-auto py-8">
            <Card className="p-6">
                <h1 className="text-2xl font-bold mb-4">Modifier votre CV</h1>
                {/* Contenu de la page d'édition */}
            </Card>
        </div>
    )
}
