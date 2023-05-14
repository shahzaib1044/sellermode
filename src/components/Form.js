 import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [degree, setDegree] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('degree', degree);
    formData.append('skills', skills);
    formData.append('experience', experience);
    formData.append('resume', resume);

    try {
      await axios.post('/api/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Redirect to job listing page after successful profile creation
      window.location.href = '/jobs';
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setFileName(file.name);
  };

  return (
    <div>
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Age:
          <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <label>
          Degree:
          <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} />
        </label>
        <br />
        <label>
          Skills:
          <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
        </label>
        <br />
        <label>
          Experience:
          <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} />
        </label>
        <br />
        <label className={fileName ? 'file-name' : ''}>
          Resume:
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          {fileName && <span>{fileName}</span>}
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
