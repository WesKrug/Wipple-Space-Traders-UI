import { Card, Container } from "@nextui-org/react";
import Link from "next/link";

interface Props {
    children: JSX.Element;
    title?: string
    link?: string
  }
  
  export default function ContentPane({ children, title, link }: Props) {
  
  return (
    <section>
      <Container className="@p-4">
        <Card className="@bg-blue-500 ">
          <section className="@flex @justify-center">
            {title && <h1 className="@text-center">{title}</h1>}
            {link && <h1><Link href={link}>🔗</Link></h1>}
          </section>
          <Card.Body>
            {children}
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}
