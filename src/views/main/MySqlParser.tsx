
import { CharStream, CommonTokenStream, ParserRuleContext, ParseTreeWalker }  from 'antlr4';
import MySqlLexer from './sqlparser/MySqlLexer';
import MySqlParser, {
  ColumnCreateTableContext,
  ColumnDeclarationContext, ColumnDefinitionContext,
  CreateDefinitionsContext, DdlStatementContext, FullColumnNameContext,
  TableNameContext
} from './sqlparser/MySqlParser';
import MySqlParserVisitor from './sqlparser/MySqlParserVisitor'
import MySqlParserListener from "@/views/Main/sqlparser/MySqlParserListener";


interface Table {
  name: string;
  columns: string[];
  primaryKey: string;
  foreignKeys: string[];
  uniqueKeys: string[];
  indexes: string[];
  comments: string[];
  constraints: string[];
  tableOptions: string[];
  engine: string;
  charset: string;
  collate: string;
  rowFormat: string;
  autoIncrement: string;
  comment: string;
  partition: string;
  subpartition: string;
  dataDirectory: string;
}

const tableMap = new Map<string, Table>();
let table: Table = {
  name: '',
  columns: [],
  primaryKey: '',
  foreignKeys: [],
  uniqueKeys: [],
  indexes: [],
  comments: [],
  constraints: [],
  tableOptions: [],
  engine: '',
  charset: '',
  collate: '',
  rowFormat: '',
  autoIncrement: '',
  comment: '',
  partition: '',
  subpartition: '',
  dataDirectory: '',
};
export function parseDDL(): void {
  const input = `create table article
                 (
                     id          bigint auto_increment comment 'id'
                         primary key,
                     title       varchar(100)                        not null comment '标题',
                     content     text                                null comment '内容',
                     create_by   bigint                              not null,
                     create_time timestamp default CURRENT_TIMESTAMP not null,
                     update_by   bigint                              not null,
                     update_time timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
                     deleted     tinyint   default 0                 not null
                 );
  create table article2
  (
      id          bigint auto_increment comment 'id'
          primary key,
      title       varchar(100)                        not null comment '标题',
      content     text                                null comment '内容',
      create_by   bigint                              not null,
      create_time timestamp default CURRENT_TIMESTAMP not null,
      update_by   bigint                              not null,
      update_time timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
      deleted     tinyint   default 0                 not null
  );
  `
  const chars = new CharStream(input); // replace this with a FileStream as required
  const lexer: any = new MySqlLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new MySqlParser(tokens);
  //
  // const ddlStatementContext = parser.ddlStatement();
  //
  // console.log(ddlStatementContext, '----ddlStatementContext----')
  //
  //
  // ddlStatementContext.accept(new CustomVisitor());




  const createTableContext = parser.createTable();
  console.log(createTableContext, '--- createTableContext');
  const walker = new MyTreeWalker();
  ParseTreeWalker.DEFAULT.walk(walker, createTableContext);

  console.log(table, '--- table');

  // table.columns = [];
}


class MyTreeWalker extends MySqlParserListener {

  enterTableName = (ctx: TableNameContext) => {
    console.log("In enterColumnCreateTable");
    console.log(ctx);
    table.name = ctx.getText();
  };

  enterFullColumnName = (ctx: FullColumnNameContext) => {
    console.log("In FullColumnNameContext");
    console.log(ctx, ctx.getText());
    table.columns.push(ctx.getText());
  };

}


class CustomVisitor extends MySqlParserVisitor<any> {

  visitChildren(ctx: ParserRuleContext) {
    if (!ctx) {
      return;
    }

    if (ctx instanceof TableNameContext) {
      if (ctx.children) {
        console.log(ctx.children[0].getText(), '--- tableName----')
      }
    }

    if (ctx instanceof CreateDefinitionsContext) {
      console.log(ctx.getText(), '--- CreateDefinitionsContext---')
      if (ctx.children) {
        for (let child of ctx.children) {
          if (child instanceof ColumnDeclarationContext) {
            console.log(child, '--- CreateDefinitionsContext.column ---');
            console.log(child.getText(), '--- CreateDefinitionsContext.column ---');
          }
        }
      }
    }

    if (ctx instanceof FullColumnNameContext) {
      console.log(ctx.getText(), '--- FullColumnNameContext ---');
    }

    if (ctx instanceof ColumnDefinitionContext) {
      console.log(ctx.getText(), '--- ColumnDefinitionContext ---');
    }


    if (ctx.children) {
      return ctx.children.map((child: any) => {
        if (child.children && child.children.length != 0) {
          // console.log(child.getText(),child, 'this');
          return child.accept(this);
        } else {
          // console.log(child.getText(), 'text');
          return child.getText();
        }
      });
    }
  }
}



