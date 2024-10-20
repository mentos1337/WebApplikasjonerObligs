export type Project = {
  Id: string;
  Title: string;
  Description: string;
  "Image Source": string;
  publishedAt?: Date;
  public: boolean;
  status: 'draft' | 'published';
  tags: string[];
};