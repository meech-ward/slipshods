import Editor from "@monaco-editor/react";
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html#fontSize
export default function SimpleCodeEditor({ defaultValue }) {
  return (
    <div className="h-80 mt-6">
    <Editor
    className="overflow-hidden rounded-xl"
      defaultLanguage="markdown"
      defaultValue={defaultValue}
      theme="vs-dark"
      // theme="hc-black"
      options={{
        autoDetectHighContrast: false,
        // readOnly: true,
        contextmenu: false,
        // cursorStyle: "line",
        // cursorWidth: 1,
        fontSize: 18,
        showUnused: true,
        // letterSpacing: 1,
        scrollbar: {
          vertical: "hidden",
          verticalHasArrows: false,
          verticalScrollbarSize: 0,
          verticalSliderSize: 0,
        },
        fontWeight: "thin",
        fontWeight: 100,
        glyphMargin: false,
        guides: {
          highlightActiveIndentation: false,
          indentation: false
        },
        lightbulb: {
          enabled: false
        },
        // lineDecorationsWidth: 10,
        // lineHeight:22,
        lineNumbers: "off",
        lineNumbersMinChars: 3,
        overviewRulerBorder: false,
        padding: {
          top: 10,
          bottom: 10,
        },
        // find: {
        //   seedSearchStringFromSelection: true,
        // },
        // ideCursorInOverviewRuler: true,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
      }}
      wrapperProps={{
        // className: "rounded-3xl",
      }}

    />
    </div>
  )
}