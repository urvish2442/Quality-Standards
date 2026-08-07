import ThreadBasics from "@/features/threads/components/ThreadBasics";
import ThreadSizeTable from "@/features/threads/components/ThreadSizeTable";
import {
  BSP_G_BASICS,
  BSP_G_THREADS,
} from "@/features/threads/constants/threadsData";

const BSP_COLUMNS = [
  { key: "size", label: "Designation" },
  { key: "majorDia", label: "Major Ø (mm)" },
  { key: "tpi", label: "TPI" },
  { key: "pitch", label: "Pitch (mm)" },
  { key: "pitchDia", label: "Pitch Ø (mm)" },
  { key: "minorDia", label: "Minor Ø (mm)" },
];

const BspThreadsView = () => {
  return (
    <div className="flex flex-col gap-6">
      <ThreadBasics
        badge="ISO 228-1 · BSPP (G)"
        title="BSP parallel pipe threads (G)"
        description="G threads (BSPP) are parallel pipe threads with a Whitworth 55° form. Pressure-tight joints are not made on the threads — sealing needs a washer, O-ring, or bonded seal. Nominal size refers to the traditional pipe size, not the major diameter."
        items={BSP_G_BASICS}
      />

      <ThreadSizeTable
        title="G series — basic dimensions"
        description="Common ISO 228-1 parallel pipe thread sizes from G 1/16 to G 6."
        columns={BSP_COLUMNS}
        rows={BSP_G_THREADS}
        unitNote="Diameters and pitch in millimetres; TPI as threads per inch"
      />
    </div>
  );
};

export default BspThreadsView;
