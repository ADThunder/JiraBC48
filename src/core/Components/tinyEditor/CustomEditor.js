import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import { Editor as TinyMCEEditor } from "tinymce";
import { initEditorConfig } from "./editorConfig";

const CustomEditor = ({ name, className, formInstance }) => {
  const [value, setValue] = useState("");
  const editorRef = useRef(null);
  const handleChange = (newValue, editor) => {
    formInstance?.setFieldValue("description", newValue);
    setValue(newValue);
  };

  return (
    <Editor
      value={formInstance?.getFieldValue("description")}
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={initEditorConfig}
      onEditorChange={handleChange}
    />
  );
};

export default CustomEditor;
