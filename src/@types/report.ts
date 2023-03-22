export type Report = {
  id?: string;
  type: "design" | "theme";
  userId: string;
  targetId: string;

  categoryId: string;
  reason: string;
  createdDate: Date;
};

export type ReportCategory = {
  id?: string;
  name: string;
};
