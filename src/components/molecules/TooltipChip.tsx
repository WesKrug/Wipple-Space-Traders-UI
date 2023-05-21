import { useState } from "react"

interface Props {
  chipText: string
  tooltipText: string
}

export const TooltipChip = ({ chipText, tooltipText }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <section className="@flex @flex-col @items-center">
      <div className="@bg-slate-500 @mx-2 @px-2 @rounded-lg" onMouseOver={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>{chipText}</div>
      {showTooltip &&
        <div className="@bg-slate-600 @mt-8 @max-w-xs @p-2 @rounded-lg @absolute @items-center">
          <div className="@bg-slate-600 @w-4 @h-4 @absolute @rotate-45 @bg-center @left-[150px] @top-[-8px] "></div>
          {tooltipText}

        </div>}

    </section>
  )
}