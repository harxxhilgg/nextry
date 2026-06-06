"use client";

import { ContactForm } from "@/components/main/contact-form";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <div className="h-screen flex flex-col justify-center max-w-xl mx-auto">
      <h1 className="text-center gap-x-2 text-4xl font-semibold tracking-tight">
        Contact Support
      </h1>

      <p className="mt-4 text-center text-muted-foreground">
        Get in touch with us. We will get back to you as soon as possible.
      </p>

      <Separator orientation="horizontal" className="mt-8 mb-2" />

      <ContactForm />
    </div>
  );
}
