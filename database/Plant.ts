import * as SQLite from "expo-sqlite";
import { ColumnType, IBaseModule, TableStructor } from "expo-sqlite-wrapper";
import { TableNames } from ".";
import { PlantInterface } from "../store";

export const PlantsTableName = "Plants";

export class Plant extends IBaseModule<TableNames> implements PlantInterface {
  name?: string;
  nickname: string;
  photoUrl: string;

  constructor({ name, nickname, photoUrl }: PlantInterface) {
    super(PlantsTableName);
    this.name = name || undefined;
    this.nickname = nickname;
    this.photoUrl = photoUrl;
  }

  static GetTableStructor() {
    return new TableStructor<Plant, TableNames>(PlantsTableName, [
      {
        columnName: (x) => x.id,
        columnType: ColumnType.Number,
        nullable: false,
        isPrimary: true,
        autoIncrement: true,
        isUique: true,
      },
      {
        columnName: (x) => x.name,
        columnType: ColumnType.String,
        nullable: true,
      },
      {
        columnName: (x) => x.nickname,
        columnType: ColumnType.String,
        nullable: false,
      },
      {
        columnName: (x) => x.photoUrl,
        columnType: ColumnType.String,
        nullable: false,
      },
    ]);
  }
}
