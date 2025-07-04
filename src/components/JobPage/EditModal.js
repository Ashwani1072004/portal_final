import React, { useState } from 'react';

const EditModal = ({ job, onClose, onUpdate }) => {
  const [editedJob, setEditedJob] = useState(job);

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
          backgroundColor: "#2D3748",
          padding: "30px",
          borderRadius: "15px",
          width: "500px",
          maxWidth: "90%",
        }}
      >
        <h2 style={{ color: "#FFFFFF", marginBottom: "20px" }}>Edit Job</h2>

        <input
          type="text"
          value={editedJob.title}
          onChange={(e) =>
            setEditedJob({ ...editedJob, title: e.target.value })
          }
          placeholder="Job Title"
          style={{
            width: "95%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #4B5563",
            backgroundColor: "#374151",
            color: "#FFFFFF",
          }}
        />

        <textarea
          value={editedJob.description}
          onChange={(e) =>
            setEditedJob({ ...editedJob, description: e.target.value })
          }
          placeholder="Job Description"
          style={{
            width: "95%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #4B5563",
            backgroundColor: "#374151",
            minHeight: "100px",
            color: "#FFFFFF",
          }}
        />

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              backgroundColor: "#800000",
              color: "#F5F5DC",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onUpdate(editedJob)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#006400",
              color: "#F5F5DC",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
};

export default EditModal; 