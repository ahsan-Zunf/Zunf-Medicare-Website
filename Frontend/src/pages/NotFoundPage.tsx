import { Link } from "react-router-dom";
import { Button } from "@/components/custom";

export default function NotFoundPage() {
  return (
    <main role="main" className="min-h-[70vh] grid place-items-center px-4">
      <section className="text-center max-w-md">
        <p className="text-sm text-muted-foreground font-mono">404</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
          Page not found
        </h1>
        <p className="mt-2 text-muted-foreground text-pretty">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <Link to="/">Go to homepage</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}


