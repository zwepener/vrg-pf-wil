"use server";

import Container from "@/components/ui/container";

export default async function Page() {
  return (
    <div className="contact">
      <Container className="container">
        <span>Please contact us at:</span>
        <a href="mailto:vrg.realhome@gmail.com">vrg.realhome@gmail.com</a>
      </Container>
    </div>
  );
}
