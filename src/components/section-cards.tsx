import { IconTrendingDown, IconTrendingUp, IconUsers, IconReport } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardsProps {
  totalRecords?: number;
  age5to17?: number;
  age17plus?: number;
  growth?: number;
}

export function SectionCards({ 
  totalRecords = 0, 
  age5to17 = 0, 
  age17plus = 0, 
  growth = 0 
}: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Records Processed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalRecords.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +{growth}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Recent data upload <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Valid entries from CSV
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Age 5-17 Group</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {age5to17.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="secondary">
              <IconUsers />
              Students
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            School-going demographic
          </div>
          <div className="text-muted-foreground">
            Requires biometrics update
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Age 17+ Group</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {age17plus.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="secondary">
              <IconUsers />
              Adults
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Voting age population
          </div>
          <div className="text-muted-foreground">Verification complete</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Data Integrity</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            99.9%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600 border-green-600">
              <IconReport />
              Secure
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Zero-Knowledge Proofs Active
          </div>
          <div className="text-muted-foreground">Tamper detection enabled</div>
        </CardFooter>
      </Card>
    </div>
  )
}
