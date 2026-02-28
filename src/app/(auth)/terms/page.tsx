import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Terms of Service</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: February 20, 2026
          </p>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing and using Nextry, you accept and agree to be bound by
              the terms and provision of this agreement. If you do not agree to
              these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Use of Service</h2>
            <p className="text-muted-foreground">
              You agree to use Nextry only for lawful purposes and in a way that
              does not infringe the rights of, restrict, or inhibit anyone
              else's use and enjoyment of the service. You must not use the
              service to transmit any harmful, threatening, or offensive
              material.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized
              use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Intellectual Property
            </h2>
            <p className="text-muted-foreground">
              All content, features, and functionality of Nextry are owned by us
              and are protected by international copyright, trademark, and other
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Third-Party Services
            </h2>
            <p className="text-muted-foreground">
              Our service may contain links to third-party websites or services
              that are not owned or controlled by Nextry. We have no control
              over and assume no responsibility for the content, privacy
              policies, or practices of any third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              Nextry shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or
              inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes by posting the new terms on
              this page. Your continued use of the service after such
              modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend your account and
              access to the service at our sole discretion, without notice, for
              conduct that we believe violates these terms or is harmful to
              other users or the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. Contact Information
            </h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please
              contact us through our support channels.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t">
            <Link href="/login" className="text-primary hover:underline">
              ← Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
