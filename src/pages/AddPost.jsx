import React from 'react';
import { Container, PostForm } from '../components';

function AddPost() {
  return (
    <div className="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
