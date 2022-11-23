import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.css";

const Blog = ({ ...props }) => {
  const { content, title } = props;
  return (
    <div className="Feed ReadBlog">
      <Navbar />
      <div className="Blogs">
        <h2 className="blog-portal-head">Read Blog</h2>
        <article className="Blog">
          <header className="Blog-Head">
            <div className="Blog-Head-left">
              <img
                // src={blog?.author?.dp}
                // onError={(e) => (e.target.src = writerPlaceholder)}
                alt="dp"
              />
              <span>
                <h3>{title}</h3>
              </span>
            </div>
          </header>
          <div
            className="Blog-Body"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </article>
      </div>
    </div>
  );
};

export default Blog;
