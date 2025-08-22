module.exports = (project) => {
  const paths = {};
  (project.endpoints || []).forEach(ep => {
    paths[ep.path] = paths[ep.path] || {};
    paths[ep.path][ep.method.toLowerCase()] = {
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: ep.schema || {}
            }
          }
        }
      }
    };
  });

  return {
    openapi: '3.0.0',
    info: {
      title: project.name,
      version: '1.0.0'
    },
    paths
  };
};
