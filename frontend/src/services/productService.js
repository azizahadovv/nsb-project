import api from '../api/client';

const productService = {
  getAll: (params) => api.get('/products', { params }),
  getBySlug: (slug) => api.get(`/products/slug/${slug}`),
  getByCategory: (slug, params) => api.get(`/products/category/${slug}`, { params }),
  getPopular: (params) => api.get('/products/popular', { params }),
  search: (q, params) => api.get('/products/search', { params: { q, ...params } }),
};

export default productService;
