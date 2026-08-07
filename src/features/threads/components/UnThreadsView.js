import ThreadBasics from "@/features/threads/components/ThreadBasics";
import ThreadSizeTable from "@/features/threads/components/ThreadSizeTable";
import {
  UN_BASICS,
  UNC_THREADS,
  UNF_THREADS,
} from "@/features/threads/constants/threadsData";

const UN_COLUMNS = [
  { key: "size", label: "Designation" },
  { key: "majorDia", label: "Major Ø (in)" },
  { key: "tpi", label: "TPI" },
  { key: "pitch", label: "Pitch (in)" },
  { key: "series", label: "Series" },
];

const UnThreadsView = () => {
  return (
    <div className="flex flex-col gap-6">
      <ThreadBasics
        badge="ASME B1.1 · Unified"
        title="Unified inch screw threads (UN)"
        description="Unified inch screw threads share a 60° triangular profile with Metric threads, but sizes are defined in inches and pitch as threads per inch. UNC is the coarse series and UNF is the fine series used across the US and Canada."
        items={UN_BASICS}
      />

      <ThreadSizeTable
        title="UNC — Unified Coarse"
        description="Common UNC diameter–TPI combinations from ASME B1.1."
        columns={UN_COLUMNS}
        rows={UNC_THREADS}
        unitNote="Major diameter and pitch in inches"
      />

      <ThreadSizeTable
        title="UNF — Unified Fine"
        description="Common UNF diameter–TPI combinations from ASME B1.1."
        columns={UN_COLUMNS}
        rows={UNF_THREADS}
        unitNote="Major diameter and pitch in inches"
      />
    </div>
  );
};

export default UnThreadsView;
