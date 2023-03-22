export type Report = {
  id?: string;
  type: "design" | "theme";
  userId: string;
  targetId: string;

  category: ReportCategory;
  reason: string;
  createdDate: Date;
};

export type ReportCategory = {
  id?: string;
  name: string;
};
