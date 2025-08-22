import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const DocsPreview = ({ projectId }) => {
  const url = `${process.env.REACT_APP_API_URL || ''}/projects/${projectId}/docs`;
  return <SwaggerUI url={url} />;
};

export default DocsPreview;
