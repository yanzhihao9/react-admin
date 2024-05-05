
import { CharStream, CommonTokenStream, ParserRuleContext }  from 'antlr4';
import MySqlLexer from './sqlparser/MySqlLexer';
import MySqlParser  from './sqlparser/MySqlParser';
import MySqlParserVisitor from './sqlparser/MySqlParserVisitor'

export function parseDDL(): void {
  const input = `create table blog.article
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
                 )
  `
  const chars = new CharStream(input); // replace this with a FileStream as required
  const lexer: any = new MySqlLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new MySqlParser(tokens);
  parser.buildParseTrees = true;
  console.log(parser.ddlStatement().accept(new CustomVisitor()), 'test');


}

class CustomVisitor extends MySqlParserVisitor<any> {

  visitChildren(ctx: ParserRuleContext) {
    if (!ctx) {
      return;
    }
    if (ctx.children) {
      return ctx.children.map((child: any) => {
        if (child.children && child.children.length != 0) {
          console.log(child.getText(),child, 'this');
          return child.accept(this);
        } else {
          console.log(child.getText(), 'text');
          return child.getText();
        }
      });
    }
  }
}



