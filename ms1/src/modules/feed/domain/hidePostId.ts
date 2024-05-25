import { UniqueEntityID } from '../../../shared/domain/uniqueEntityID';
import { Entity } from '../../../shared/domain/entity';

export class HidePostId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): HidePostId {
    return new HidePostId(id);
  }
}
