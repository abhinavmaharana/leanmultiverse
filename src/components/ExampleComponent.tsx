import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ExampleComponent() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Example Component</CardTitle>
        <CardDescription>
          This component demonstrates how to use shadcn/ui components
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="example-input">Example Input</Label>
          <Input 
            id="example-input" 
            placeholder="Type something here..." 
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="default">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          This component shows various button variants and form elements.
        </div>
      </CardContent>
    </Card>
  )
}
