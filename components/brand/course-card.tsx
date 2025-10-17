import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type CourseCardProps = {
  title: string
  duration: string
  description: string
}

export function CourseCard({ title, duration, description }: CourseCardProps) {
  return (
    <Card className="h-full border-t-4" style={{ borderTopColor: "var(--color-accent)" }}>
      <CardHeader>
        <CardTitle className="font-heading text-xl">{title}</CardTitle>
        <span className="inline-block rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
          {duration}
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="btn-accent">Apply Now</Button>
        <Button variant="secondary">View Details</Button>
      </CardFooter>
    </Card>
  )
}
