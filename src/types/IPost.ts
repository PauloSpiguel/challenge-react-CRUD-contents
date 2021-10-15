export interface IPost {
  id: string;
  title: string;
  relationship_content: Array<string>;
  author: Array<string>;
  created_at?: string;
}
