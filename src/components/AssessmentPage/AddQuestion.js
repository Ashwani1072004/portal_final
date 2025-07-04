import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography, Paper, Stack, Chip, TextField, IconButton } from '@mui/material';

const AddQuestion = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingAssessmentId = null,
  initialQuestions = []
}) => {
  const [questions, setQuestions] = useState(initialQuestions.length ? initialQuestions : [{
    text: '',
    options: ['', '', '', '']
  }]);

  const addQuestion = () => {
    setQuestions(prev => [...prev, {
      text: '',
      options: ['', '', '', '']
    }]);
  };

  const deleteQuestion = (index) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value, optionIndex = null) => {
    setQuestions(prev => prev.map((q, i) => {
      if (i !== index) return q;
      if (optionIndex !== null) {
        
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      
      return { ...q, [field]: value };
    }));
  };

  const handleSave = () => {
    const validQuestions = questions.filter(q => 
      q.text.trim() && q.options.some(opt => opt.trim())
    );
    
    if (validQuestions.length > 0) {
      const formattedQuestions = validQuestions.map(q => ({
        ...q,
        correctAnswer: 0 
      }));
      
      onSave(formattedQuestions);
      
      setQuestions([{
        text: '',
        options: ['', '', '', '']
      }]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#0A2E3C',
        padding: '30px',
        borderRadius: '15px',
        width: '600px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <h2 style={{ color: '#FFFFFF' }}>
            {editingAssessmentId ? 'Edit Assessment' : 'New Assessment'}
          </h2>
          <button
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#FFFFFF', 
              cursor: 'pointer' 
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {questions.map((question, index) => (
          <Paper key={index} sx={{
            bgcolor: '#374151',
            p: 2,
            mb: 2,
            borderRadius: 1,
            color: 'white'
          }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Chip 
                  label={`Q${index + 1}`}
                  sx={{ 
                    bgcolor: '#60A5FA',
                    color: 'white',
                    fontWeight: 'bold'
                  }} 
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  value={question.text}
                  onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                  placeholder="Enter question text"
                  sx={{
                    '& .MuiInputBase-root': {
                      color: 'white',
                      bgcolor: '#1F2937'
                    }
                  }}
                />
              </Box>

              <Stack spacing={1} sx={{ pl: 4 }}>
                {question.options.map((option, optIndex) => (
                  <Box key={optIndex} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Chip
                      label={String.fromCharCode(65 + optIndex)}
                      sx={{
                        bgcolor: '#1F2937',
                        color: '#9CA3AF',
                        minWidth: 32,
                        '& .MuiChip-label': {
                          padding: '0 8px'
                        }
                      }}
                    />
                    <TextField
                      fullWidth
                      value={option}
                      onChange={(e) => updateQuestion(index, 'options', e.target.value, optIndex)}
                      placeholder={`Option ${optIndex + 1}`}
                      sx={{
                        '& .MuiInputBase-root': {
                          color: 'white',
                          bgcolor: '#1F2937'
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '8px 14px'
                        }
                      }}
                      size="small"
                    />
                  </Box>
                ))}
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton
                  onClick={() => deleteQuestion(index)}
                  sx={{ color: '#EF4444' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Stack>
          </Paper>
        ))}

        <button
          onClick={addQuestion}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2B6CB0',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            marginBottom: '15px',
            cursor: 'pointer'
          }}
        >
          Add New Question
        </button>

        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Save Assessment
        </button>
      </div>
    </div>
  )
};

export default AddQuestion;