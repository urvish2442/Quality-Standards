import ThreadsView from "@/features/threads/components/ThreadsView";

export const metadata = {
  title: "Threads",
  description:
    "Metric, British Whitworth, Unified (UN), and BSP (G) screw thread basics and size tables.",
  keywords: [
    "metric threads",
    "ISO 261",
    "Whitworth",
    "BSW",
    "BSF",
    "UNC",
    "UNF",
    "BSP",
    "BSPP",
    "G thread",
    "ISO 228-1",
    "ASME B1.1",
  ],
};

const ThreadsPage = () => {
  return <ThreadsView />;
};

export default ThreadsPage;
