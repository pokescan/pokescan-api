import { Aggregate, Document, Model } from 'mongoose';

export class AbstractService<M extends Document, D> {
  private readonly model: Model<M>;
  constructor(model: Model<M>) {
    this.model = model;
  }

  async create(dto: D): Promise<M> {
    const createdObject = new this.model(dto);
    return createdObject.save();
  }

  findAll(offset = 0, limit = 10): Promise<M[]> {
    return this.model
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
  }

  find(id: string): Promise<M> {
    return this.model.findById(id).exec();
  }

  findByQueries(queries: any): Promise<M[]> {
    return this.model.find(queries).exec();
  }

  aggregate(aggregation: unknown[]): Aggregate<M[]> {
    return this.model.aggregate(aggregation);
  }

  update(id: string, obj?: any): Promise<M> {
    return this.model.findByIdAndUpdate(id, obj, { new: true }).exec();
  }

  delete(id: string): Promise<M> {
    return this.model.findByIdAndRemove(id).exec();
  }
}
