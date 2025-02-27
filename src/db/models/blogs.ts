import mongoose, { Model, Document } from "mongoose";

import { blogSchema } from "../schema/blogSchema";

interface IBlog extends Document {
  title: string;
  description: string;
  content: string;
}
interface BLogModel extends Model<IBlog> {
  createBlog({
    title,
    description,
    content,
  }: {
    title: string;
    description: string;
    content: string;
  }): Promise<IBlog>;
}
class Blog {
  static async createBlog(
    this: BLogModel,
    {
      title,
      description,
      content,
    }: { title: string; description: string; content: string }
  ): Promise<IBlog> {
    const doc = {
      title,
      description,
      content,
    };
    const blog = await this.create(doc);
    return blog;
  }
}
blogSchema.loadClass(Blog);
export const Blogs: BLogModel = mongoose.model<IBlog, BLogModel>(
  "Blogs",
  blogSchema
);
