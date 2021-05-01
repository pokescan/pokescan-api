import { Document, Model } from 'mongoose';

export class AbstractService<M extends Document> {
  private readonly model: Model<M>;
  constructor(model: Model<M>) {
    this.model = model;
  }

  async create(dto: unknown): Promise<M> {
    const createdObject = new this.model(dto);
    return createdObject.save();
  }

  findAll(): Promise<M[]> {
    return this.model.find().exec();
  }

  find(id: string): Promise<M> {
    return this.model.findById(id).exec();
  }

  findByQueries(queries: any): Promise<M[]> {
    return this.model.find(queries).exec();
  }

  update(id: string, obj?: any): Promise<M> {
    return this.model.findByIdAndUpdate(id, obj, { new: true }).exec();
  }

  delete(id: string): Promise<M> {
    return this.model.findByIdAndRemove(id).exec();
  }
}
