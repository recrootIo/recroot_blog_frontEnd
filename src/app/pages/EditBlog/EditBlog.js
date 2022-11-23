import "./index.css";
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import Navbar from "../../components/Navbar/Navbar";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { EditorState } from "draft-js";

const drop = {
  textAlign: "center",
  padding: "50px",
  border: "2px dashed #4F9AFF",
  backgroundColor: "#EFF6FF",
  color: "#afafaf",
  borderRadius: "8px",
};

const EditBlog = () => {
  const [file, setFiles] = useState("");

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },

    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      console.log(acceptedFiles, "acceptedFiles");
    },
  });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onSetEditorState = (newState) => {
    setEditorState(newState);
  };

  useEffect(() => {
    setEditorState(() => EditorState.createEmpty());
  }, []);

  return (
    <div className="blog-portal-wrapper">
      <Navbar />
      <div className="blog-portal">
        <h2 className="blog-portal-head">Edit Blog</h2>
        <Stack spacing={3}>
          <TextField size="large" placeholder="Type your title here..." />
          <div>
            <section className="container">
              {acceptedFiles[0]?.name ? (
                <img src={URL.createObjectURL(acceptedFiles[0])} alt="" />
              ) : (
                <div {...getRootProps({ className: "dropzone" })} style={drop}>
                  <input {...getInputProps()} />

                  <p color="primary">
                    Drag and drop or <span color="primary">Browse</span>
                  </p>
                </div>
              )}
            </section>
          </div>
          <FormControl>
            <Editor
              // editorState={editorState}
              // onEditorStateChange={(val) => onSetEditorState(val)}
              wrapperClassName="richWrapper"
              editorClassName="richEditor"
              toolbarClassName="richToolbar"
              placeholder="Type your content here..."
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
          </FormControl>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent="center"
          spacing={3}
          sx={{ mt: "20px" }}
        >
          <Button variant="contained" sx={{ color: "white" }}>
            Publish
          </Button>
          <Button variant="outlined" color="warning">
            Discard
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default EditBlog;
