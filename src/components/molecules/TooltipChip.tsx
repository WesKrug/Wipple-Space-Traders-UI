import { useState } from "react"

interface Props {
  children: JSX.Element
  chipText: string
}

export const TooltipChip = ({ chipText, children }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <section className="@flex @flex-col @items-center">
      <div className="@bg-slate-500 @mx-2 @px-2 @my-2 @rounded-lg" onMouseOver={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>{chipText}</div>
      {showTooltip &&
        <div className="@bg-slate-600 @border-slate-800 @border-2 @mt-10 @max-w-xs @p-2 @rounded-lg @absolute @items-center @z-20">
          <div className="@bg-slate-800 @w-4 @h-4 @absolute @rotate-45 @bg-center @left-[150px] @top-[-8px] "/>
          {children}
        </div>
      }
    </section>
  )
}