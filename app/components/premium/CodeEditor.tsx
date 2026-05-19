"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  setCode,
  language,
}: {
  code: string;
  setCode: (v: string) => void;
  language?: string;
}) {
  return (
    <Editor
      height="350px"
      defaultLanguage={language ?? "python"}
      value={code}
      onChange={(v) => setCode(v || "")}
      theme="vs-dark"
    />
  );
}