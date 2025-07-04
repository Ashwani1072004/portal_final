import React, { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import {Card,CardContent,CardActions,Typography,Grid,Button} from"@mui/material";
import {Edit as EditIcon,Delete as DeleteIcon,Visibility as VisibilityIcon,PeopleAlt as PeopleIcon} from "@mui/icons-material";
import { Box } from "@mui/material";
import EditModal from '../components/JobPage/EditModal';
import { fadeIn, usePageAnimations, animationStyles } from '../components/JobPage/Animations';
import { generateCandidates } from '../components/JobPage/RandomGenerator';
import { CandidateModal } from '../components/JobPage/CandidateModal';
import { JobModal } from '../components/JobPage/JobModal';

const Jobs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedJob, setSelectedJob] = useState(null);

  const initialJobs = [
    {
      id: 1,
      title: "Software Engineer",
      description: "Full Stack Developer with React experience",
      candidates: 14,
      candidateList: generateCandidates(14),
    },
    {
      id: 2,
      title: "Product Manager",
      description: "Lead product development and strategy",
      candidates: 8,
      candidateList: generateCandidates(8),
    },
    {
      id: 3,
      title: "UX/UI Designer",
      description: "Design intuitive user interfaces and experiences",
      candidates: 10,
      candidateList: generateCandidates(10),
    },
  ];

  const [jobs, setJobs] = useLocalStorage("jobs", initialJobs);

  const [newJob, setNewJob] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleStatusUpdate = (candidateId, newStatus) => {
    setJobs((prevJobs) => {
      const updatedJobs = prevJobs.map((job) => {
        if (job.id === selectedJob.id) {
          return {
            ...job,
            candidateList: job.candidateList.map((candidate) => {
              if (candidate.id === candidateId) {
                return {
                  ...candidate,
                  status: newStatus,
                };
              }
              return candidate;
            }),
          };
        }
        return job;
      });

      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      return updatedJobs;
    });

    setSelectedJob((prev) => ({
      ...prev,
      candidateList: prev.candidateList.map((candidate) => {
        if (candidate.id === candidateId) {
          return {
            ...candidate,
            status: newStatus,
          };
        }
        return candidate;
      }),
    }));
  };

  

  const handleJobClick = (job) => {
    setSelectedJob(selectedJob?.id === job.id ? null : job);
  };

  const handleAdd = () => {
    if (newJob.title && newJob.description) {
      const newJobWithMeta = {
        id: Date.now(),
        ...newJob,
        candidates: 0,
        candidateList: [],
        isRecent: true,
        dateAdded: new Date().toISOString(),
      };

      const updatedJobs = [...jobs, newJobWithMeta];
      setJobs(updatedJobs);

      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      window.dispatchEvent(new Event("storage"));

      setNewJob({ title: "", description: "" });
    }
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  

  const handleUpdate = (updatedDetails) => {
    setJobs(
      jobs.map((job) =>
        job.id === editingJob.id
          ? {
              ...job,
              title: updatedDetails.title,
              description: updatedDetails.description,
            }
          : job
      )
    );
    setEditingJob(null);
  };

  useEffect(() => {
    const cleanup = setInterval(() => {
      const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);

      const updatedJobs = storedJobs.map((job) => ({
        ...job,
        isRecent: job.isRecent && new Date(job.dateAdded) > dayAgo,
      }));

      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      setJobs(updatedJobs);
    }, 3600000);

    return () => clearInterval(cleanup);
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (!storedJobs) {
      localStorage.setItem("jobs", JSON.stringify(initialJobs));
      setJobs(initialJobs);
    } else {
      try {
        const parsedJobs = JSON.parse(storedJobs);
        const validatedJobs = parsedJobs.map((job) => ({
          ...job,
          candidateList:
            job.candidateList?.map((candidate) => ({
              id: candidate.id,
              name: candidate.name || `Candidate ${candidate.id}`,
              email: candidate.email || `candidate${candidate.id}@example.com`,
              phone:
                candidate.phone ||
                `+1 (555) ${String(Math.floor(Math.random() * 10000)).padStart(
                  4,
                  "0"
                )}`,
              skills:
                candidate.skills ||
                ["JavaScript", "React", "Node.js"].slice(
                  0,
                  Math.floor(Math.random() * 3) + 2
                ),
              experience:
                candidate.experience ||
                `${Math.floor(Math.random() * 8) + 2} years`,
              education: candidate.education || "Bachelor in Computer Science",
              resumeLink:
                candidate.resumeLink ||
                `https://drive.google.com/file/d/1uiMliYik2KTIgOuf3d7DReoBvu52TP7B/view?usp=drive_link`,
              applicationDate:
                candidate.applicationDate || new Date().toLocaleDateString(),
              status: candidate.status || "Under Review",
            })) || generateCandidates(job.candidates || 0),
        }));
        setJobs(validatedJobs);
      } catch (error) {
        console.error("Error parsing stored jobs:", error);
        localStorage.setItem("jobs", JSON.stringify(initialJobs));
        setJobs(initialJobs);
      }
    }
  }, []);

  const animate = usePageAnimations();

  

  const [editingJob, setEditingJob] = useState(null);

  const handleEdit = (job) => {
    setEditingJob(job);
  };

  return (
    <>
      <style>{animationStyles}</style>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#1A1F2B",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "90%",
            paddingTop: "40px",
            paddingBottom: "40px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#F3F4F6",
              marginBottom: "40px",
              ...(animate.header ? fadeIn : { opacity: 0 }),
            }}
          >
            JOB POSTINGS MANAGEMENT
          </h1>

          <Box
            sx={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              ...(animate.form ? fadeIn : { opacity: 0 }),
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(-20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Box
              component="input"
              type="text"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              sx={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #4B5563",
                width: { xs: "auto", sm: "200px" }, // Full width on mobile, fixed width on larger screens
                backgroundColor: "#374151",
                color: "#FFFFFF",
                "::placeholder": { color: "#FFFFFF80" },
              }}
            />
            <Box
              component="input"
              type="text"
              placeholder="Job Description"
              value={newJob.description}
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
              sx={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #4B5563",
                width: { xs: "auto", sm: "200px" }, // Full width on mobile, fixed width on ls
                backgroundColor: "#374151",
                color: "#FFFFFF",
                "::placeholder": { color: "#FFFFFF80" },
              }}
            />

            <button
              onClick={editingId ? handleUpdate : handleAdd}
              style={{
                padding: "10px 20px",
                backgroundColor: "#3B82F6",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#2563EB",
                },
              }}
            >
              {editingId ? "Update Job" : "Add Job"}
            </button>
          </Box>

          <Grid
            container
            spacing={3}
            sx={{
              mt: 2,
              ...(animate.table ? fadeIn : { opacity: 0 }),
            }}
          >
            {jobs.map((job, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={job.id}
                sx={{
                  animation: `fadeIn 0.5s ease-in forwards ${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <Card
                  sx={{
                    bgcolor: "#0A2E3C",
                    color: "#FFFFFF",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow:
                      "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    },
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: "15px",
                      boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.1)",
                      pointerEvents: "none",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      gutterBottom
                      sx={{ color: "#FFFFFF" }}
                    >
                      {job.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2, height: "40px", color: "#FFFFFF" }}
                    >
                      {job.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#FFFFFF",
                      }}
                    >
                      <PeopleIcon sx={{ fontSize: 20, color: "#FFFFFF" }} />
                      Candidates Applied: {job.candidates}
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      px: 2,
                      pb: 2,
                      "& > *": {
                        flex: 1,
                        maxWidth: "120px",
                      },
                    }}
                  >
                    <Button
                      startIcon={<EditIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(job);
                      }}
                      sx={{
                        bgcolor: "#4A6670",
                        color: "#FFFFFF",
                        borderRadius: "50px",
                        padding: "8px 16px",
                        "&:hover": {
                          bgcolor: "#5A7680",
                          transition: "background-color 0.3s",
                        },
                        "@media (max-width: 750px), (min-width: 900px) and (max-width: 1180px)":
                          {
                            minWidth: "auto",
                            "& .MuiButton-startIcon": {
                              margin: 0,
                            },
                            "& span": {
                              display: "none",
                            },
                          },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(job.id);
                      }}
                      sx={{
                        bgcolor: "#8B4543",
                        color: "#FFFFFF",
                        borderRadius: "50px",
                        padding: "8px 16px",
                        "&:hover": { bgcolor: "#9B5553" },
                        "@media (max-width: 750px), (min-width: 900px) and (max-width: 1180px)":
                          {
                            minWidth: "auto",
                            "& .MuiButton-startIcon": {
                              margin: 0,
                            },
                            "& span": {
                              display: "none",
                            },
                          },
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleJobClick(job)}
                      sx={{
                        bgcolor: "#3D5A80",
                        color: "#FFFFFF",
                        borderRadius: "50px",
                        padding: "8px 16px",
                        "&:hover": {
                          bgcolor: "#4D6A90",
                          transition: "background-color 0.3s",
                        },
                        minWidth: "100px",
                        "@media (max-width: 750px),  (min-width: 900px) and (max-width: 1180px)":
                          {
                            minWidth: "auto",
                            "& .MuiButton-startIcon": {
                              margin: 0,
                            },
                            "& span": {
                              display: "none",
                            },
                          },
                      }}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {selectedJob && (
            <JobModal 
              job={selectedJob} 
              onClose={() => setSelectedJob(null)}
              onCandidateSelect={setSelectedCandidate}
            />
          )}

          {selectedCandidate && (
            <CandidateModal
              candidate={selectedCandidate}
              onClose={() => setSelectedCandidate(null)}
              onStatusUpdate={handleStatusUpdate}
            />
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              marginTop: "40px",
              gap: "10px",
              ...(animate.button ? fadeIn : { opacity: 0 }),
            }}
          >
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#5C8999",
                color: "#F5F5DC",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                width: "150px",
                "&:hover": {
                  backgroundColor: "#4A6F7C",
                },
              }}
            >
              Home
            </button>

            <button
              onClick={() => navigate("/assessment")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#5C8999",
                color: "#F5F5DC",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                width: "150px",
                "&:hover": {
                  backgroundColor: "#4A6F7C",
                },
              }}
            >
              Create Assessment
            </button>
          </div>

          {editingJob && (
            <EditModal
              job={editingJob}
              onClose={() => setEditingJob(null)}
              onUpdate={handleUpdate}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;