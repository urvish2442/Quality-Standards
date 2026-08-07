import ThreadBasics from "@/features/threads/components/ThreadBasics";
import ThreadSizeTable from "@/features/threads/components/ThreadSizeTable";
import {
  METRIC_BASICS,
  METRIC_COARSE_THREADS,
  METRIC_FINE_THREADS,
} from "@/features/threads/constants/threadsData";

const METRIC_COLUMNS = [
  { key: "size", label: "Designation" },
  { key: "majorDia", label: "Major Ø (mm)" },
  { key: "pitch", label: "Pitch (mm)" },
  { key: "series", label: "Series" },
];

const MetricThreadsView = () => {
  return (
    <div className="flex flex-col gap-6">
      <ThreadBasics
        badge="ISO Metric · M"
        title="Metric screw threads"
        description="ISO general-purpose metric screw threads use a 60° symmetric V profile. Coarse pitch is the default practice pitch from ISO 261; fine pitches are selected combinations for higher strength or adjustment applications."
        items={METRIC_BASICS}
      />

      <ThreadSizeTable
        title="Metric coarse pitch (preferred sizes)"
        description="1st-choice diameter/pitch combinations commonly used for general fasteners (ISO 261 / ISO 262)."
        columns={METRIC_COLUMNS}
        rows={METRIC_COARSE_THREADS}
        unitNote="Dimensions in millimetres"
      />

      <ThreadSizeTable
        title="Metric fine pitch (selected sizes)"
        description="Common fine-pitch combinations from the ISO 261 fine-pitch plan."
        columns={METRIC_COLUMNS}
        rows={METRIC_FINE_THREADS}
        unitNote="Dimensions in millimetres"
      />

    </div>
  );
};

export default MetricThreadsView;
