export type Design = {
  id?: string;
  userId: string;
  userName: string;
  themeId: string;
  description: string;

  figmaUrl: string;
  isPublic: boolean;
  createdDate: Date;
};
