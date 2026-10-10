export type KaggleItem = {
  title: string;
  url: string;
  note?: string;
  tags?: ("Data Science" | "AI")[];
};

export const KAGGLE_NOTEBOOKS: KaggleItem[] = [
  {
    title: "Customer Journey Analysis",
    url: "https://example.com",
    note: "Clustering and funnel analysis for conversion insights.",
    tags: ["Data Science"],
  },
  {
    title: "Product Retention Signals",
    url: "https://example.com",
    note: "EDA — engagement patterns and trend comparison.",
    tags: ["Data Science"],
  },
  {
    title: "Feature Prioritization Study",
    url: "https://example.com",
    note: "Classification and measurable impact analysis for roadmap decisions.",
    tags: ["Data Science", "AI"],
  },
];