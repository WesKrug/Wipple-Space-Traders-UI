import Link from "next/link";

interface Props {
    children: JSX.Element;
    title?: string
    link?: string
  }
  
  export default function ContentPane({ children, title, link }: Props) {
  
  return (
    <section>
      <div className="@p-4 @m-4">
        <div className="@flex @flex-col @justify-between @bg-blue-500 @m-4 @p-4 @border-gray-100 @border-2 @rounded-lg">
          <section className="@flex @flex-row @pr-2 @mb-2 @justify-center">
            {title && <h1 className="@text-center">{title}</h1>}
            {link && <h1><Link href={link}>🔗</Link></h1>}
          </section>
          <div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
