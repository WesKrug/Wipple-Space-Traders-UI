import { Card } from "@mui/material"

interface ThemedCardProps {
  children: JSX.Element
}

export default function ThemedCard({children}: ThemedCardProps) {
  return(
    <Card className="@bg-slate-600 @text-white @border-slate-800 @border-2 @shadow-lg @my-2">
      <div className="@m-2">
        {children}
      </div>
    </Card>
  )
}
