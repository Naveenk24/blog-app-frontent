import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
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
    value: 'technology',
    displayText: 'Technology',
  },
  {
    id: 4,
    value: 'lifestyle',
    displayText: 'Lifestyle',
  },
];

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [optionValue, setOptionValue] = useState(selectOption[0].value);
  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();

    if (title.length === 0) {
      return alert('Enter title');
    } else if (summary.length === 0) {
      return alert('Enter title');
    } else if (content.length === 0) {
      return alert('Enter notes!');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('category', optionValue);
    formData.append('file', files);

    await axios.post('http://localhost:3004/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    alert('Blog created successfully!');
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="post-input"
          />
          <input
            type="text"
            value={summary}
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
            value={content}
            onChange={(newValue) => setContent(newValue)}
            modules={modules}
            formats={formats}
            className="quill"
          />
          <button type="submit" className="post-button">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

//
