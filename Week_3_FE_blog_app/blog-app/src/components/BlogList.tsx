import type { BlogPost } from '../interfaces/BlogInterfaces';
import BlogItem from './BlogItem';

interface BlogListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

const BlogList = ({ posts, onEdit, onDelete }: BlogListProps) => {
  return (
    <div className="blog-list">
      {posts.length === 0 ? (
        <p>No blog posts yet. Create your first post!</p>
      ) : (
        posts.map((post) => (
          <BlogItem
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default BlogList;
