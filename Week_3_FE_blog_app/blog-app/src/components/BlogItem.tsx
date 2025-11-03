import type { BlogPost } from '../interfaces/BlogInterfaces';

interface BlogItemProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

const BlogItem = ({ post, onEdit, onDelete }: BlogItemProps) => {
  return (
    <div className="blog-item">
      <h2>{post.title}</h2>
      <p className="blog-meta">
        By {post.author} | Created: {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="blog-content">{post.content}</div>
      <div className="blog-actions">
        <button onClick={() => onEdit(post)}>Edit</button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
};

export default BlogItem;
