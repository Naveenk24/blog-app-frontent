import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './index.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const selectOption = [
  {
    id: 1,
    value: 'social',
    displayText: 'Social',
  },
  {
    id: 2,
    value: 'education',
    displayText: 'Education',
  },
  {
    id: 3,
    value: 'technolygy',
    displayText: 'Technolygy',
  },
  {
    id: 4,
    value: 'lifestyle',
    displayText: 'Lifestyle',
  },
];

const EditPost = () => {
  const [updatedContent, setContent] = useState('');
  const [updatedTitle, setTitle] = useState('');
  const [updatedSummary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [optionValue, setOptionValue] = useState(selectOption[0].value);
  const navigate = useNavigate();
  const params = useParams();

  const getSingBlog = async () => {
    const { id } = params;
    const response = await axios.get(`http://localhost:3004/${id}`);
    setTitle(response.data.title);
    setSummary(response.data.summary);
    setOptionValue(response.data.category);
    setContent(response.data.content);
  };

  useEffect(() => {
    getSingBlog();
  }, []);

  const createNewPost = async (e) => {
    e.preventDefault();
    const { id } = params;

    if (updatedTitle.length === 0) {
      return alert('Enter title');
    } else if (updatedSummary.length === 0) {
      return alert('Enter title');
    } else if (updatedContent.length === 0) {
      return alert('Enter notes!');
    }

    const formData = new FormData();
    formData.append('title', updatedTitle);
    formData.append('summary', updatedSummary);
    formData.append('content', updatedContent);
    formData.append('category', optionValue);
    formData.append('file', files);

    await axios.put(`http://localhost:3004/edit/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Blog updated successfully!');
    navigate('/');
  };

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="create-container">
      <Navbar />
      <div className="post-container">
        <h1 className="post-heading">Create New Blog</h1>
        <form onSubmit={createNewPost} className="create-post-form">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="post-input"
          />
          <input
            type="text"
            value={updatedSummary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Summary"
            className="post-input"
          />
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files[0])}
            className="file-input"
          />
          <select
            value={optionValue}
            onChange={(e) => setOptionValue(e.target.value)}
            className="post-input"
          >
            {selectOption.map((item) => (
              <option key={item.id} value={item.value}>
                {item.displayText}
              </option>
            ))}
          </select>
          <ReactQuill
            theme="snow"
            value={updatedContent}
            onChange={(newValue) => setContent(newValue)}
            modules={modules}
            formats={formats}
            className="quill"
          />
          <button type="submit" className="post-button">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;

//
