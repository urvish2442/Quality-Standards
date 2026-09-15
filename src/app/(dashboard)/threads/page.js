import ThreadsView from "@/features/threads/components/ThreadsView";

export const metadata = {
  title: "Threads",
  description:
    "Metric, British Whitworth, Unified (UN), UNS, NPT, and BSP (G) thread specs and size limits calculator.",
  keywords: [
    "metric threads",
    "thread size calculator",
    "pitch diameter min max",
    "major diameter min max",
    "minor diameter min max",
    "ISO 261",
    "Whitworth",
    "BSW",
    "BSF",
    "UNC",
    "UNF",
    "UNS threads",
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
