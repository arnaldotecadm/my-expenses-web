export class ItemNotSelected extends Error {
  applicationStatus?: number;
  errorMessageTranslationkey: string;
  handled: boolean = false;

  constructor(message?: string) {
    super(message);
    this.name = ItemNotSelected.name;
    Object.setPrototypeOf(this, ItemNotSelected.prototype);
  }
}
