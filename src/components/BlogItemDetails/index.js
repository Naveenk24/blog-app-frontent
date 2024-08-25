import Navbar from '../Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Footer from '../Footer';
import './index.css';
import { useEffect, useState } from 'react';

const BlogItemDetails = () => {
  const [blogDetails, setBlogDetails] = useState('');

  const params = useParams();

  const getSingBlog = async () => {
    const { id } = params;
    const response = await axios.get(`http://localhost:3004/${id}`);
    setBlogDetails(response.data);
  };

  useEffect(() => {
    getSingBlog();
  }, []);

  const { title, summary, image, content } = blogDetails;

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="blog-item-details">
      <Navbar />
      <div className="blog-details-nav">
        <h1 className="blog-details-heading">{title}</h1>
        <div className="blog-details-image-container">
          <img src={image} alt="blog-image" className="blog-details-image" />
          <div className="new">
            <p className="blog-details">{summary}</p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BlogItemDetails;
