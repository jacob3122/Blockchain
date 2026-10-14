import { Column, DataType, DefaultScope, Model, Table } from 'sequelize-typescript';

export enum UserRole {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  INVESTOR = 'INVESTOR',
  VALIDATOR = 'VALIDATOR',
  VALUER = 'VALUER',
}

export enum UserStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  BLOCKED = 'BLOCKED',
}

@DefaultScope(() => ({ attributes: { exclude: ['passwordHash'] } }))
@Table({ tableName: 'users', underscored: true })
export class User extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare passwordHash: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false, defaultValue: [] })
  declare roles: UserRole[];

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    allowNull: false,
    defaultValue: UserStatus.PENDING,
  })
  declare status: UserStatus;

  @Column(DataType.TEXT)
  declare statusReason: string | null;

  @Column(DataType.UUID)
  declare approvedBy: string | null;

  @Column(DataType.DATE)
  declare approvedAt: Date | null;

  @Column({ type: DataType.STRING, unique: true })
  declare walletAddress: string | null;
}