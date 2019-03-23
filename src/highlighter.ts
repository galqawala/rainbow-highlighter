import * as vscode from "vscode";
import { configure } from "vscode/lib/testrunner";

//TODO add options
//TODO editor is undefined
class DecoratorClass {
  private decorationList : vscode.TextEditorDecorationType[] = [];
  private colorPalette : (() => vscode.TextEditorDecorationType) [] = 
    vscode.workspace.getConfiguration('rainbow-highlighter')['palette']
    .map((color: string) => {
      return () => {
        const decoration = vscode.window.createTextEditorDecorationType({
          backgroundColor: color,
          overviewRulerColor: color,
          });
        this.decorationList.push(decoration);
        return decoration;
        }
      }
    );
  private decorationIndex = 0;
  
  private getIndex = () => {
    const i = this.decorationIndex;
    this.decorationIndex = i >= this.colorPalette.length ? 0 : i + 1;
    return i;
  }
  public DecoratorClass() {}

  private getRanges(words: string[]): vscode.Range[] {
    const ranges: vscode.Range[] = [];
    return ranges;
  }
  public removeHighlights = () => {

  }

  public highlight(editor: vscode.TextEditor, words: string[]) {
    editor.setDecorations(this.colorPalette[this.getIndex()](), this.getRanges(words));
  }
  public highlightRange(editor: vscode.TextEditor, range: vscode.Range[]) {
    editor.setDecorations(this.colorPalette[this.getIndex()](), range);
  }
}

//use with Decorator.getInstance(); This will return decorator singleton.
export var Decorator = (function() {
  let instance: DecoratorClass;
  function createInstance() {
    return new DecoratorClass();
  }
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();
