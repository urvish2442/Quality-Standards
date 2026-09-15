import ThreadsView from "@/features/threads/components/ThreadsView";

export const metadata = {
  title: "Threads",
  description:
    "Metric, British Whitworth, Unified (UN), NPT, and BSP (G) screw thread basics and size tables.",
  keywords: [
    "metric threads",
    "ISO 261",
    "Whitworth",
    "BSW",
    "BSF",
    "UNC",
    "UNF",
    "NPT threads",
    "tapered pipe thread",
    "ASME B1.20.1",
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
