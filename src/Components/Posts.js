import React, { useState, useEffect } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [deletingPost, setDeletingPost] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const fetchAllPosts = async () => {
      try {
        const response = await fetch('https://instagram-express-app.vercel.app/api/post/all-posts', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer sk-4c3c35a4-5495-4782-b403-25078dc21920'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    
    fetchAllPosts();
  }, []); 

  
  const deletePost = async (postId) => {
    setDeletingPost(postId); 

    try {
      const response = await fetch("https://instagram-express-app.vercel.app/api/post/delete/${postId}", {
        method:'DELETE',
        headers: {
          'Authorization': 'Bearer sk-4c3c35a4-5495-4782-b403-25078dc21920'
        }
      });
      if (response.ok) {
        
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        console.error('Failed to delete post');
        setError('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Error deleting post');
    } finally {
      setDeletingPost(null); 
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <p>{post.text}</p>
            <img src={post.image} alt="post" />
            <button disabled={deletingPost === post.id} onClick={() => deletePost(post.id)}>
              {deletingPost === post.id ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;