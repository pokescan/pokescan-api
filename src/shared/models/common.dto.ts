export class CommonDto {
  updatedAt?: string;

  createdAt?: string;

  constructor(model?: any) {
    if (model) {
      this.updatedAt = model.updatedAt;
      this.createdAt = model.createdAt;
    }
  }
}
