import { ChevronDown } from "lucide-react";
import { HARDNESS_CITATIONS } from "@/features/hardness/constants/hardnessData";

const HardnessCitations = () => {
  return (
    <details className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-(--card-shadow)">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <div>
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
            Citations & references
          </h3>
          <p className="mt-0.5 text-sm text-muted">
            Standards used for hardness testing and conversion tables
          </p>
        </div>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div className="border-t border-border px-5 py-4 sm:px-6 sm:pb-6">
        <p className="text-sm text-muted">
          Hardness scales, conversion rows, and material ranges on this page are
          compiled for quick shop reference. Prefer the current primary standards
          for production drawings and inspection.
        </p>

        <ol className="mt-4 space-y-3">
          {HARDNESS_CITATIONS.map((item, index) => (
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

export default HardnessCitations;
