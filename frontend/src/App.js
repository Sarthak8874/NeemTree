import "./App.css";
import { useState } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { IoMdCloudUpload } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import InputFiles from "react-input-files";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [response, setresponse] = useState();

  const handleFileChange = (file) => {
    if (!file[0]?.name.endsWith(".xlsx")) {
      alert("File Should be Excel");
    } else {
      setUploadedFile(file[0]);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setresponse(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      {" "}
      <div className="upload">
        <div className="heading">
          <div>Add to Excel</div>
          <ImCross />
        </div>
        <div className="desc">
          <div>Add Candidates to Database</div>
          <div className="file-upload">
            {!response && (
              <>
                {" "}
                <InputFiles onChange={handleFileChange} accept=".xlsx">
                  <IoMdCloudUpload
                    style={{ fontSize: "50px", cursor: "pointer" }}
                  />
                </InputFiles>
                <div>
                  {uploadedFile
                    ? `${uploadedFile.name}`
                    : "Upload a .xlsx or .xls file here"}
                </div>
                <div>
                  {uploadedFile && (
                    <button className="button" onClick={handleUpload}>
                      Sumbit
                    </button>
                  )}
                </div>
              </>
            )}
            {response && (
              <>
                <div className="Thank-You">Thank You!</div>
                <div>
                    {" "}
                    <span>
                      <FaCheck
                        style={{
                          color: "green",
                          fontWeight: "700",
                          fontSize: "20px",
                          margin: "0px 10px",
                        }}
                      />
                    </span>
                    File Succesfully Uploaded
                </div>
                <div>Your records will be processed shortly</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
