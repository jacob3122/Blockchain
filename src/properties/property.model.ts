import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum PropertyStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  NEEDS_CHANGES = 'NEEDS_CHANGES',
  VALIDATED = 'VALIDATED',
  CLOSED = 'CLOSED',
}

@Table({ tableName: 'properties', underscored: true })
export class Property extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare ownerId: string;

  @Column(DataType.STRING)
  declare name: string | null;

  @Column(DataType.STRING)
  declare propertyType: string | null;

  @Column(DataType.STRING)
  declare address: string | null;

  @Column(DataType.STRING)
  declare city: string | null;

  @Column(DataType.STRING)
  declare state: string | null;

  @Column(DataType.STRING)
  declare pincode: string | null;

  @Column(DataType.INTEGER)
  declare areaSqft: number | null;

  @Column(DataType.TEXT)
  declare description: string | null;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'title_deed.pdf' })
  declare titleDeed: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'encumbrance_certificate.pdf' })
  declare encumbranceCertificate: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'tax_receipt.pdf' })
  declare taxReceipt: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: PropertyStatus.DRAFT })
  declare status: PropertyStatus;

  @Column(DataType.DATE)
  declare submittedAt: Date | null;
}
