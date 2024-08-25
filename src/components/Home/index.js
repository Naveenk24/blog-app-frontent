import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../Navbar';
import BlogsItem from '../BlogsItem';
import Footer from '../Footer';
import { IoSearchOutline } from 'react-icons/io5';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const tabsList = [
  {
    id: 1,
    category: 'all',
    displayText: 'All',
  },
  {
    id: 2,
    category: 'social',
    displayText: 'Social',
  },
  {
    id: 3,
    category: 'education',
    displayText: 'Education',
  },
  {
    id: 4,
    category: 'technology',
    displayText: 'Technology',
  },
  {
    id: 5,
    category: 'lifestyle',
    displayText: 'Lifestyle',
  },
];

const Home = () => {
  const [blogsList, setBlogsList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [activeTabId, setActiveTabId] = useState(tabsList[0].category);

  const getBlogsApi = async () => {
    const response = await axios.get('http://localhost:3004/');
    setBlogsList(response.data);
  };

  useEffect(() => {
    getBlogsApi();
  }, []);

  const deleteTheBlogFunction = async (id) => {
    console.log('cliked');
    await axios.delete(`http://localhost:3004/delete/${id}`);
    getBlogsApi();
  };

  const activeBlogsList = blogsList.filter((item) => {
    const tab = activeTabId;
    if (tab === 'all') {
      return true;
    }
    return tab === item.category;
  });

  const filteredInput = activeBlogsList.filter((eachItem) =>
    eachItem.title.toLowerCase().includes(searchInput)
  );

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-container">
      <Navbar />

      <div className="serach-container">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search blogs.."
          className="search-element"
        />
        <div className="search-icon-container">
          <IoSearchOutline className="search-icon" />
        </div>
      </div>

      <ul className="tabs-list">
        {tabsList.map((eachItem) => {
          const activeTab = eachItem.category === activeTabId;
          const activeClassName = activeTab ? 'active-tab' : 'tabs-list-item';
          return (
            <li
              key={eachItem.id}
              className={activeClassName}
              onClick={(e) => setActiveTabId(eachItem.category)}
            >
              {eachItem.displayText}
            </li>
          );
        })}
      </ul>

      <ul className="blogs-list">
        {filteredInput.length !== 0 ? (
          <>
            {filteredInput.map((eachItem) => (
              <BlogsItem
                key={eachItem.id}
                blogDetails={eachItem}
                deleteTheBlogFunction={deleteTheBlogFunction}
              />
            ))}
          </>
        ) : (
          <div className="no-blog-container">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?w=740&t=st=1724582566~exp=1724583166~hmac=8d9632f5c054c0158814725623f8581a2cb8b3c4d4f4bb449b27b00d80e63c27"
              alt="no-blog"
              className="no-blog-image"
            />
            <p className="not">No Blogs Found</p>
          </div>
        )}
      </ul>
      <Footer />
    </div>
  );
};

export default Home;
