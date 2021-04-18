export class CommonDto {
  _id?: string;

  updatedAt?: string;

  createdAt?: string;

  constructor(model?: any) {
    if (model) {
      this._id = model._id;
      this.updatedAt = model.updatedAt;
      this.createdAt = model.createdAt;
    }
  }
}
