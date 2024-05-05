
import { ParserRuleContext } from 'antlr4';
import MyGrammarVisitor from './MySqlParserVisitor';

class CustomVisitor extends MyGrammarVisitor<any> {

  visitChildren(ctx: ParserRuleContext) {
    if (!ctx) {
      return;
    }
    if (ctx.children) {
      return ctx.children.map((child: any) => {
        if (child.children && child.children.length != 0) {
          return child.accept(this);
        } else {
          return child.getText();
        }
      });
    }
  }
}