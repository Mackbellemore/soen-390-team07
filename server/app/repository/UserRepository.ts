import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { IUser, UserSchema } from '../models/UserModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class UserRepository extends BaseRepository<IUser> {
  protected readonly collectionName: string = 'users';
  protected readonly schema: Schema = UserSchema;

  public async findByEmail(userBody: IUser): Promise<IUser> {
    const user: IUser | null = await this.model.findOne({ email: userBody.email }).exec();

    if (!user) {
      throw new Error(`User ${userBody.email} not found`);
    }

    return user;
  }
}