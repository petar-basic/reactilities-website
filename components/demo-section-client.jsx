"use client";

import dynamic from "next/dynamic";

const DemoSection = dynamic(() => import("./demo-section"), {
  ssr: false,
  loading: () => (
    <article className="api-card">
      <h3>Loading demos...</h3>
      <p>Interactive demos are loading on the client.</p>
    </article>
  )
});

export default function DemoSectionClient() {
  return <DemoSection />;
}
