import { ChevronDown } from "lucide-react";

const ThreadCitations = ({ citations }) => {
  return (
    <details className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-(--card-shadow)">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <div>
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
            Citations & references
          </h3>
          <p className="mt-0.5 text-sm text-muted">
            Standards used for thread geometry and size tables
          </p>
        </div>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div className="border-t border-border px-5 py-4 sm:px-6 sm:pb-6">
        <p className="text-sm text-muted">
          Thread geometry and size tables on this page are compiled from the
          following standards and secondary references. Prefer the primary
          standards for production design.
        </p>

        <ol className="mt-4 space-y-3">
          {citations.map((item, index) => (
            <li
              key={item.id}
              className="rounded-xl border border-border bg-background px-4 py-3"
            >
              <p className="text-sm font-semibold text-foreground">
                {index + 1}. {item.standard}
              </p>
              <p className="mt-1 text-sm text-muted">{item.title}</p>
              <p className="mt-1 text-xs text-muted">Used for: {item.usedFor}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-sm font-medium text-primary hover:underline"
              >
                {item.url}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </details>
  );
};

export default ThreadCitations;
