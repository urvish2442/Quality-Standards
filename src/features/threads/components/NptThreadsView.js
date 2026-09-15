import ThreadBasics from "@/features/threads/components/ThreadBasics";
import ThreadSizeTable from "@/features/threads/components/ThreadSizeTable";
import {
  NPT_BASICS,
  NPT_THREADS,
} from "@/features/threads/constants/threadsData";

const NPT_COLUMNS = [
  { key: "size", label: "Designation" },
  { key: "pipeOd", label: "Pipe OD (in)" },
  { key: "tpi", label: "TPI" },
  { key: "pitch", label: "Pitch (in)" },
  { key: "pitchDia", label: "Pitch Ø E₁ (in)" },
  { key: "handTightLen", label: "L₁ Hand-tight (in)" },
  { key: "effectiveLen", label: "L₂ Effective (in)" },
  { key: "tapDrill", label: "Tap Drill" },
];

const NptThreadsView = () => {
  return (
    <div className="flex flex-col gap-6">
      <ThreadBasics
        badge="ANSI/ASME B1.20.1 · NPT"
        title="National Pipe Taper threads (NPT)"
        description="NPT threads are American standard tapered pipe threads with a 60° thread angle and a 1:16 taper ratio (3/4 in/ft on diameter). Pressure-tight seals are formed directly on the mating tapered flanks with thread sealant or PTFE tape."
        items={NPT_BASICS}
      />

      <ThreadSizeTable
        title="NPT — Tapered pipe thread basic dimensions"
        description="Standard NPT sizes from 1/16 to 3 inch with pitch diameter at gaging notch (E₁), hand-tight engagement length (L₁), effective length (L₂), and tap drill size."
        columns={NPT_COLUMNS}
        rows={NPT_THREADS}
        unitNote="Dimensions in inches unless specified; TPI as threads per inch"
      />
    </div>
  );
};

export default NptThreadsView;
