import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { CloudUpload, GetApp, PlayArrow, Visibility} from "@material-ui/icons";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CodeBlockComponent from "./CodeBlock";
import CodeBlockKalanaComponent from "./CodeBlockKalana";
import CodeBlockIndujaComponent from "./CodeBlockInduja";
import Modal from "react-modal"; // Import the Modal component


import backgroundImage2 from './images/dot.png';

const useStyles = makeStyles((theme) => ({
  customButton: {
    width: '320px', // Adjust the width as needed
    height: '40px', // Adjust the height as needed     
    borderRadius: '20px', // Add rounded corners
  },
  mt3: {
    marginTop: "3vh",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "130vh",
    backgroundColor: "#031833",
    backgroundImage: `url(${backgroundImage2})`,   
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1600px 800px',
    backgroundPosition: '40% 20%',
    backgroundAttachment:'fixed'
  },
  sideBySideContainer: {
    display: "flex",
    alignItems: "center",
  },
  sideBySideChild: {
    flex: 1,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    boxShadow: "1px 1px 2px #D9D9D9, -1px -1px 2px #FFFFFF",
  },
  fileInput: {
    display: "none",
  },
  uploadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  downloadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  downloadButtonAnimated: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    animation: "$downloadButtonAnimation 1s infinite",
  },
  "@keyframes downloadButtonAnimation": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.2)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
}));

function App() {
  const classes = useStyles();
  const [solidityFile, setSolidityFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [reentrancyLines, setReentrancyLines] = useState([]);
  const [delegateLines, setDelegateLines] = useState([]);
  const [integer_lines, setIntegerLines] = useState([]);
  const [selfDestructLines, setSelfDestructLines] = useState([]);
  const [uncheckedExternalCallLines, setUncheckedExternalCallLines] = useState(
    []
  );
  const [shortAddressLines, setShortAddressLines] = useState([]);
  const [loopedCallsLines, setLoopedCallsLines] = useState([]);
  const [insecureRandLines, setInsecureRandLines] = useState([]);
  const [throwLines, setThrowLines] = useState([]);
  const [downloadPath, setDownloadPath] = useState("");
  const [isModalOpen1, setIsModalOpen1] = useState(false); // State to manage the modal
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const openModal3 = () => {
    setIsModalOpen3(true);
  };

  const closeModal3 = () => {
    setIsModalOpen3(false);
  };


  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSolidityFile(file);
  };

  const handleUploadButtonClick = () => {
    const formData = new FormData();
    formData.append("file", solidityFile);

    setIsProcessing(true);

    fetch("https://solidity-analyzer-python-server.onrender.com/process", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setIsDownloadReady(true);
          setDownloadPath(data.file_path);
          setDelegateLines(data.delegate_lines);
          setReentrancyLines(data.reenteancy_lines);
          setIntegerLines(data.integer_lines);
          setSelfDestructLines(data.self_des_lines);
          setUncheckedExternalCallLines(data.unchecked_lines);
          setShortAddressLines(data.short_a_lines);
          setLoopedCallsLines(data.looped_lines);
          setInsecureRandLines(data.insecure_lines);
          setThrowLines(data.throw_lines);
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handleDownloadButtonClick = () => {
    const token = localStorage.getItem("token"); // Get the token from storage

    if (token) {
      // Token is present, allow the download
      const updateCountsUrl = "https://solidity-analyzer-python-server.onrender.com/updateCounts"; // Change the URL to your actual endpoint
      fetch(updateCountsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            // Counts updated successfully, allow the download
            window.open("https://solidity-analyzer-python-server.onrender.com/" + downloadPath);
          } else {
            // Show an error message related to counts
            alert("Error: " + data.data);
            window.location.href = "./Package";
          }
        })
        .catch((error) => {
          // Handle fetch error
          console.error("Fetch error:", error);
          alert("An error occurred. Please try again later.");
        });
    } else {
      // Token is not present, show a message or handle as needed
      alert(
        "You do not have permission to download the file. Please Create Account & Login!!!"
      );
      window.location.href = "./sign-up";
      // You can also redirect the user or perform any other action as needed.
    }
  };

  return (
    <div className={`${classes.root}`}>
      <div className={classes.sideBySideContainer}>
        <div id="leftBox" className={classes.sideBySideChild}>
          <div className={`${classes.container}`}>
            <input
              accept=".sol"
              className={classes.fileInput}
              id="solidity-file-input"
              type="file"
              onChange={handleFileInputChange}
            />
            <label htmlFor="solidity-file-input">
              <Button
                variant="contained"
                color="primary"
                component="span"
                className={classes.uploadButton}
                startIcon={<CloudUpload />}
                classes={{ root: classes.customButton }}
              >
                Upload Solidity File
              </Button>
            </label>
            {solidityFile && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  className={
                    isProcessing
                      ? classes.downloadButtonAnimated
                      : classes.downloadButton
                  }
                  onClick={handleUploadButtonClick}
                  disabled={isProcessing}
                  classes={{ root: classes.customButton }}
                  startIcon={<PlayArrow />}
                >
                  {isProcessing ? "Processing..." : "Process Solidity File"}
                </Button>
                {isDownloadReady && (
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.downloadButton}
                    classes={{ root: classes.customButton }}
                    onClick={handleDownloadButtonClick}
                  >
                    Download Processed Solidity File
                    <GetApp style={{ marginLeft: "8px" }} />
                  </Button>
                )}
                {isDownloadReady && (
  <>
    {localStorage.getItem("token") ? (
      // For logged-in users
      <>
        <Button
          variant="contained"
          onClick={openModal2}
          classes={{ root: classes.customButton }}
          className={classes.downloadButton}
          startIcon={<Visibility />}
        >
           View Kalana Code
        </Button>
        <Button
          variant="contained"
          onClick={openModal3}
          classes={{ root: classes.customButton }}
          className={classes.downloadButton}
          startIcon={<Visibility />}
        >
           View Induja Code
        </Button>
      </>
    ) : (
      // For not logged-in users
      <Button
        variant="contained"
        onClick={openModal1}
        classes={{ root: classes.customButton }}
        className={classes.downloadButton}
        startIcon={<Visibility />}
      >
        View Sample Code
      </Button>
    )}
  </>
)}

              </>
            )}

          </div>
        </div>
        <div
          id="rightBox"
          style={{ marginLeft: "30px" }}
          className={classes.sideBySideChild}
        >
          {isDownloadReady ? (
            <div className={`${classes.container} `}>
              <TableContainer style={{width: "800px"}}>
                <Table >
                  <TableHead>
                    reentrancyLines
                    <TableRow>
                      <TableCell>Vulnerability</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Detected on line(s)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Re-entrancy</TableCell>
                      <TableCell>
                        {reentrancyLines.length > 0
                          ? "Vulnerability detected"
                          : "No vulnerability detected"}
                      </TableCell>
                      <TableCell>
                        {reentrancyLines.length > 0
                          ? reentrancyLines.join(", ")
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Delegate Call</TableCell>
                      <TableCell>
                        {delegateLines.length > 0
                          ? "Vulnerability detected"
                          : "No vulnerability detected"}
                      </TableCell>
                      <TableCell>
                        {delegateLines.length > 0
                          ? delegateLines.join(", ")
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Integer Overflow/Underflow</TableCell>
                      <TableCell>
                        {integer_lines.length > 0
                          ? "Vulnerability detected"
                          : "No vulnerability detected"}
                      </TableCell>
                      <TableCell>
                        {integer_lines.length > 0
                          ? integer_lines.join(", ")
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Self Destruct</TableCell>
                      <TableCell>
                        {selfDestructLines.length > 0
                          ? "Vulnerability detected"
                          : "No vulnerability detected"}
                      </TableCell>
                      <TableCell>
                        {selfDestructLines.length > 0
                          ? selfDestructLines.join(", ")
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Unchecked External Call</TableCell>
                      <TableCell>
                        {uncheckedExternalCallLines.length > 0
                          ? "Vulnerability detected"
                          : "No vulnerability detected"}
                      </TableCell>
                      <TableCell>
                        {uncheckedExternalCallLines.length > 0
                          ? uncheckedExternalCallLines.join(", ")
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Short Address Attack</TableCell>
                      <TableCell>
                        {shortAddressLines.length > 0
                          ? "Vulnerability detected"
                          : "No vulnerability detected"}
                      </TableCell>
                      <TableCell>
                        {shortAddressLines.length > 0
                          ? shortAddressLines.join(", ")
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Looped Calls</TableCell>
                      <TableCell>
                        {loopedCallsLines.length > 0
                          ? "Vulnerability detected"
                          : "No vulnerability detected"}
                      </TableCell>
                      <TableCell>
                        {loopedCallsLines.length > 0
                          ? loopedCallsLines.join(", ")
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Insecure Source Of Randomness</TableCell>
                      <TableCell>
                        {insecureRandLines.length > 0
                          ? "Vulnerability detected"
                          : "No vulnerability detected"}
                      </TableCell>
                      <TableCell>
                        {insecureRandLines.length > 0
                          ? insecureRandLines.map((line, index) => {
                              return `${line[0]}${
                                insecureRandLines.length === index + 1
                                  ? " "
                                  : ", "
                              }`;
                            })
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Throw</TableCell>
                      <TableCell>
                        {throwLines.length > 0
                          ? "Vulnerability detected"
                          : "No vulnerability detected"}
                      </TableCell>
                      <TableCell>
                        {throwLines.length > 0 ? throwLines.join(", ") : "-"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
         isOpen={isModalOpen1}
         onRequestClose={closeModal1}
         contentLabel="Processed Solidity Code Modal"
         style={{
            content: {
             margin: "50px", // Adjust the margin as needed
             border: "2px solid #333",
          },
        }}
       >
        <CodeBlockComponent />
        <Button onClick={closeModal1} variant="contained" color="primary" >Close</Button>
      </Modal>
      <Modal
         isOpen={isModalOpen2}
         onRequestClose={closeModal2}
         contentLabel="Processed Solidity Code Modal"
         style={{
            content: {
             margin: "50px", // Adjust the margin as needed
             border: "2px solid #333",
          },
        }}
       >         
        <CodeBlockKalanaComponent />
        <Button variant="contained" color="primary" onClick={closeModal2}>Close</Button>
      </Modal>
      <Modal
         isOpen={isModalOpen3}
         onRequestClose={closeModal2}
         contentLabel="Processed Solidity Code Modal"
         style={{
            content: {
             margin: "50px", // Adjust the margin as needed
             border: "2px solid #333",
          },
        }}
       >
        <CodeBlockIndujaComponent />
        <Button variant="contained" color="primary" onClick={closeModal3}>Close</Button>
      </Modal>
    </div>
  );
}

export default App;
