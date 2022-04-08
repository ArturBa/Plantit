import createDbContext, {
  IDatabase,
  IQueryResultItem,
  IBaseModule,
} from "expo-sqlite-wrapper";
import * as SQLite from "expo-sqlite";
import { Plant } from "./Plant";
import { TableNames } from ".";

const tables = [Plant.GetTableStructor()];

export class DbContext {
  databaseName: string = "mydatabase.db";
  database: IDatabase<TableNames>;
  constructor() {
    this.database = createDbContext<TableNames>(
      tables,
      async () =>
        SQLite.openDatabase(this.databaseName)
    );
  }
}
