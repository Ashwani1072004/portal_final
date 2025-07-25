const getRandomDate = () => {
  // Generate a random date within the last 90 days
  const start = new Date();
  start.setDate(start.getDate() - 90);
  const end = new Date();
  
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
  // Format date as MM/DD/YYYY
  return randomDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

const getRandomStatus = () => {
  const statuses = [
    "Under Review",
    "Interview Scheduled",
    "Assignment Given",
    "Selected",
    "Rejected"
  ];
  
  // Generate weighted random selection (earlier statuses more likely)
  const weights = [0.3, 0.25, 0.2, 0.15, 0.07, 0.03];
  const random = Math.random();
  let sum = 0;
  
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random < sum) return statuses[i];
  }
  
  return statuses[0]; // fallback to first status
}; 

export const generateCandidates = (count) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      name: `Candidate ${index + 1}`,
      email: `candidate${index + 1}@example.com`,
      phone: `+91 (555) ${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
      skills: ["JavaScript", "React", "Node.js", "Python", "SQL"].slice(
        0,
        Math.floor(Math.random() * 3) + 2
      ),
      experience: `${Math.floor(Math.random() * 8) + 2} years`,
      education: "Bachelor in Computer Science",
      resumeLink: `https://drive.google.com/file/d/1Y0TiL8RADm0ehpI2nE3w4zOCGDFKDKS7/preview`,
      applicationDate: getRandomDate(),
      status: getRandomStatus(),
    }));
};
