export class CommonDto {
  id?: string;

  updatedAt?: string;

  createdAt?: string;

  constructor(model?: any) {
    if (model) {
      this.id = model._id;
      this.updatedAt = model.updatedAt;
      this.createdAt = model.createdAt;
    }
  }
}
