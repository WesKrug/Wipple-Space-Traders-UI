export default function ProgressBar({ currentValue, maxValue }: { currentValue: number, maxValue: number }) {
  const progress = (currentValue / maxValue) * 100;
  const width = progress + '%';


  const generateVerticalLines = () => {
    const lines = [];
    for (let i = 10; i < 100; i += 10) {
      const lineStyle = {
        left: `${i}%`,
      };
      lines.push(<div key={i} className="@absolute @z-20 @w-[1px] @h-4 @bg-black" style={lineStyle}></div>);
    }
    return lines;
  };

  return (
    <div className="@flex @flex-row @items-center">
      <div className="@pr-2">0</div>
      <div className="@relative @w-[350px] @h-4 @bg-gray-200 @rounded">
      {generateVerticalLines()}
        <div
          className="@absolute @h-4 @bg-orange-900 @rounded"
          style={{ width }}
        ></div>
      </div>
      <div className="@pl-2">{maxValue.toString()}</div>
    </div>
  );
}
