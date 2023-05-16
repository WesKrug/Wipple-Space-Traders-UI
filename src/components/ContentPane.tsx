interface Props {
    children: JSX.Element;
  }
  
  export default function ContentPane({ children }: Props) {
  
  return (
    <section>
      <div className="@rounded-lg @mt-10 @w-fit @bg-blue-500 @center @max-w-[75vw] @p-3">
        {children}
      </div>
    </section>
  );
}
