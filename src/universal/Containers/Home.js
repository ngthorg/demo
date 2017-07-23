import React from 'react';
import DocumentMeta from 'react-document-meta';

const meta = { title: 'Home' };

function Home() {
  return (
    <div>
      <DocumentMeta {...meta} />
      <p>Home page</p>
    </div>
  );
}

export default Home;
