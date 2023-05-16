import { Card, Container } from "@nextui-org/react";

interface Props {
    children: JSX.Element;
    title?: string
  }
  
  export default function ContentPane({ children, title }: Props) {
  
  return (
    <section>
      <Container className="@p-4">
        <Card className="@bg-blue-500 ">
          <h1 className="@text-center">{title}</h1>
          <Card.Body>
            {children}
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}
