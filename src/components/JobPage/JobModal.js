import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Button } from "@mui/material";

export const JobModal = ({ job, onClose, onCandidateSelect }) => {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "#1A202C",
            padding: "30px",
            borderRadius: "10px",
            width: "80%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: 0, color: "#FFFFFF" }}>{job.title}</h2>
            <button
              onClick={onClose}
              style={{
                padding: "5px 10px",
                backgroundColor: "#EF4444",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>

          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#2D3748",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              borderRadius: "8px",
              "& .MuiTable-root": {
                backgroundColor: "transparent",
              },
              "& .MuiTableCell-root": {
                borderColor: "#4A5568",
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#374151",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      padding: "16px",
                      textAlign: "center",
                      width: "25%",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      padding: "16px",
                      textAlign: "center",
                      width: "25%",
                    }}
                  >
                    Resume
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      padding: "16px",
                      textAlign: "center",
                      width: "25%",
                    }}
                  >
                    Application Date
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      padding: "16px",
                      textAlign: "center",
                      width: "25%",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {job.candidateList.map((candidate, index) => (
                  <TableRow
                    key={candidate.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#2D3748" : "#374151",
                      "&:hover": {
                        backgroundColor: "#4A5568",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell
                      onClick={() => {
                        console.log("Clicking candidate:", candidate);
                        onCandidateSelect(candidate);
                      }}
                      sx={{
                        color: "#FFFFFF",
                        borderColor: "#4A5568",
                        padding: "16px",
                        textAlign: "center",
                      }}
                    >
                      {candidate.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#FFFFFF",
                        borderColor: "#4A5568",
                        padding: "16px",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        href={candidate.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#60A5FA",
                          "&:hover": {
                            color: "#93C5FD",
                            backgroundColor: "rgba(96, 165, 250, 0.1)",
                          },
                          textTransform: "none",
                          fontWeight: "medium",
                          minWidth: "120px",
                        }}
                      >
                        View Resume
                      </Button>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#FFFFFF",
                        borderColor: "#4A5568",
                        padding: "16px",
                        textAlign: "center",
                      }}
                    >
                      {candidate.applicationDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#FFFFFF",
                        borderColor: "#4A5568",
                        padding: "16px",
                        textAlign: "center",
                      }}
                    >
                      {candidate.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  };