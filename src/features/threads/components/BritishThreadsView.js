import ThreadBasics from "@/features/threads/components/ThreadBasics";
import ThreadSizeTable from "@/features/threads/components/ThreadSizeTable";
import {
  BRITISH_BASICS,
  BSW_THREADS,
  BSF_THREADS,
} from "@/features/threads/constants/threadsData";

const BRITISH_COLUMNS = [
  { key: "size", label: "Designation" },
  { key: "majorDia", label: "Major Ø (in)" },
  { key: "tpi", label: "TPI" },
  { key: "pitch", label: "Pitch (in)" },
  { key: "series", label: "Series" },
];

const BritishThreadsView = () => {
  return (
    <div className="flex flex-col gap-6">
      <ThreadBasics
        badge="BS 84 · Whitworth"
        title="British Whitworth threads"
        description="Whitworth-form parallel screw threads use a 55° included angle with rounded crests and roots. BSW is the coarse series and BSF is the fine series. These are primarily used for legacy maintenance; new designs usually prefer Metric or Unified threads."
        items={BRITISH_BASICS}
      />

      <ThreadSizeTable
        title="BSW — British Standard Whitworth (coarse)"
        description="Preferred fractional BSW diameter and TPI combinations from BS 84."
        columns={BRITISH_COLUMNS}
        rows={BSW_THREADS}
        unitNote="Major diameter and pitch in inches"
      />

      <ThreadSizeTable
        title="BSF — British Standard Fine"
        description="Preferred fractional BSF diameter and TPI combinations from BS 84."
        columns={BRITISH_COLUMNS}
        rows={BSF_THREADS}
        unitNote="Major diameter and pitch in inches"
      />
    </div>
  );
};

export default BritishThreadsView;
