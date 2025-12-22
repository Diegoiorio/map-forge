"use client";

import forceBlankTargets from "@/lib/forceBlankTargets";
import Editor, {
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnLink,
  BtnNumberedList,
  BtnBulletList,
  BtnClearFormatting,
  createButton,
} from "react-simple-wysiwyg";

const BtnAlignCenter = createButton("Align center", "≡", "justifyCenter");
const BtnAligLeft = createButton("Align center", "<<", "justifyLeft");
const BtnAligRight = createButton("Align center", ">>", "justifyRight");

export const BtnH1 = createButton("Heading 1", "h1", () => {
  document.execCommand("formatBlock", false, "h1");
});

export const BtnH2 = createButton("Heading 2", "h2", () => {
  document.execCommand("formatBlock", false, "h2");
});

export const BtnH3 = createButton("Heading 3", "h3", () => {
  document.execCommand("formatBlock", false, "h3");
});

export const BtnH4 = createButton("Heading 4", "h4", () => {
  document.execCommand("formatBlock", false, "h4");
});

export const BtnCodeBlock = createButton("Code block", "</>", () => {
  document.execCommand("formatBlock", false, "pre");
});

interface TextEditorProps {
  description: string;
  setDescription: (desc: string) => void;
}

const Sep = () => (
  <span style={{ margin: "0 2px", opacity: 0.4, color: "#444" }}>|</span>
);

export default function TextEditor(TextEditorProps: TextEditorProps) {
  return (
    <Editor
      value={TextEditorProps.description}
      placeholder="Area description"
      onChange={(e) => {
        const next = forceBlankTargets(e.target.value);
        TextEditorProps.setDescription(next);
      }}
      className={"wysiwyg"}
      style={{
        width: "100%",
        maxWidth: "100%",
        minWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <Toolbar>
        <BtnBold />
        <BtnItalic />
        <BtnUnderline />
        <BtnStrikeThrough />
        <Sep />
        <BtnBulletList />
        <BtnNumberedList />
        <Sep />
        <BtnLink />
        <BtnClearFormatting />
        <Sep />
        <BtnAligLeft />
        <BtnAlignCenter />
        <BtnAligRight />
        <Sep />
        <BtnH1 />
        <BtnH2 />
        <BtnH3 />
        <BtnH4 />
        <BtnCodeBlock />
      </Toolbar>
    </Editor>
  );
}
