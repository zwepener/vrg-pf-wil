"use server";

import Container from "@/components/ui/container";
import ContactForm from "./form";

export default async function Page() {
  return (
    <div className="contact">
      <Container className="container">
        <ContactForm />
      </Container>
    </div>
  );
}
