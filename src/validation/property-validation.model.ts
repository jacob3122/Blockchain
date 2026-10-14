import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { PropertyStatus } from '../properties/property.model';

@Table({ tableName: 'property_validations', underscored: true })
export class PropertyValidation extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare propertyId: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare validatorId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare decision: PropertyStatus;

  @Column(DataType.TEXT)
  declare reason: string | null;
}
