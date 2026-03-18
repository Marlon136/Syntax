"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  setCode,
}: {
  code: string;
  setCode: (v: string) => void;
}) {
  return (
    <Editor
      height="350px"
      defaultLanguage="python"
      value={code}
      onChange={(v) => setCode(v || "")}
      theme="vs-dark"
    />
  );
}