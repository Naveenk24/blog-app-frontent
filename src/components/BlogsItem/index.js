import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaArrowRight } from 'react-icons/fa6';
import './index.css';
import { Link } from 'react-router-dom';

const BlogsItem = (props) => {
  const { blogDetails, deleteTheBlogFunction } = props;
  const { title, summary, image, category, id } = blogDetails;

  const deleteTheBlog = () => {
    deleteTheBlogFunction(id);
  };

  return (
    <li className="blog-item">
      <Link to={`/blog/${id}`}>
        <img src={image} alt="blog-image" className="blog-item-image" />
      </Link>
      <div className="blog-item-content">
        <div className="blog-item-nav">
          <p className="category-content">{category}</p>

          <button className="blog-item-edit-button">
            <Link to={`/edit/${id}`}>
              <FaEdit className="blog-item-edit-icon" />
            </Link>
            <p className="blog-item-edit">Edit</p>
          </button>
        </div>

        <p className="blog-item-heading">{title}</p>

        <p className="blog-item-description">{summary}</p>

        <div className="read-container">
          <div className="read-container">
            <p className="read">Read more</p>
            <Link to={`/blog/${id}`}>
              <FaArrowRight className="blog-item-arrow-icon" />
            </Link>
          </div>
          <RiDeleteBinLine className="delete-icon" onClick={deleteTheBlog} />
        </div>
      </div>
    </li>
  );
};

export default BlogsItem;
