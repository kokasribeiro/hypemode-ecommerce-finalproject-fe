/**
 * HATEOAS utility functions
 * Implements Hypermedia as the Engine of Application State
 */

export const generateLinks = (req, resource, id = null) => {
  const baseUrl = `${req.protocol}://${req.get('host')}/api`;
  const resourcePath = `/${resource}`;
  const resourceIdPath = id ? `${resourcePath}/${id}` : resourcePath;

  return {
    self: {
      href: `${baseUrl}${resourceIdPath}`,
      method: 'GET'
    },
    create: {
      href: `${baseUrl}${resourcePath}`,
      method: 'POST',
      title: `Create new ${resource}`
    },
    update: id ? {
      href: `${baseUrl}${resourceIdPath}`,
      method: 'PUT',
      title: `Update ${resource}`
    } : null,
    delete: id ? {
      href: `${baseUrl}${resourceIdPath}`,
      method: 'DELETE',
      title: `Delete ${resource}`
    } : null
  };
};

export const generatePaginationLinks = (req, page, totalPages, limit) => {
  const baseUrl = `${req.protocol}://${req.get('host')}/api`;
  const currentPath = req.originalUrl.split('?')[0];
  
  const links = {
    self: {
      href: `${baseUrl}${currentPath}?page=${page}&limit=${limit}`,
      method: 'GET'
    }
  };

  if (page > 1) {
    links.first = {
      href: `${baseUrl}${currentPath}?page=1&limit=${limit}`,
      method: 'GET',
      title: 'First page'
    };
    links.prev = {
      href: `${baseUrl}${currentPath}?page=${page - 1}&limit=${limit}`,
      method: 'GET',
      title: 'Previous page'
    };
  }

  if (page < totalPages) {
    links.next = {
      href: `${baseUrl}${currentPath}?page=${page + 1}&limit=${limit}`,
      method: 'GET',
      title: 'Next page'
    };
    links.last = {
      href: `${baseUrl}${currentPath}?page=${totalPages}&limit=${limit}`,
      method: 'GET',
      title: 'Last page'
    };
  }

  return links;
};

export const generateResourceLinks = (req, resource, id, additionalActions = {}) => {
  const baseUrl = `${req.protocol}://${req.get('host')}/api`;
  const resourcePath = `/${resource}`;
  const resourceIdPath = `${resourcePath}/${id}`;

  const links = {
    self: {
      href: `${baseUrl}${resourceIdPath}`,
      method: 'GET'
    },
    list: {
      href: `${baseUrl}${resourcePath}`,
      method: 'GET',
      title: `List all ${resource}s`
    },
    update: {
      href: `${baseUrl}${resourceIdPath}`,
      method: 'PUT',
      title: `Update ${resource}`
    },
    delete: {
      href: `${baseUrl}${resourceIdPath}`,
      method: 'DELETE',
      title: `Delete ${resource}`
    }
  };

  // Add additional action links
  Object.keys(additionalActions).forEach(action => {
    links[action] = {
      href: `${baseUrl}${resourceIdPath}/${additionalActions[action].path}`,
      method: additionalActions[action].method || 'GET',
      title: additionalActions[action].title || action
    };
  });

  return links;
};

export const formatResponse = (req, data, resource, options = {}) => {
  const { id = null, page = null, totalPages = null, limit = null, additionalActions = {} } = options;
  
  const response = {
    data,
    _links: {}
  };

  if (id) {
    response._links = generateResourceLinks(req, resource, id, additionalActions);
  } else if (page && totalPages) {
    response._links = generatePaginationLinks(req, page, totalPages, limit);
  } else {
    response._links = generateLinks(req, resource, id);
  }

  if (page) {
    response._page = {
      current: page,
      total: totalPages,
      limit: limit,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  return response;
};
