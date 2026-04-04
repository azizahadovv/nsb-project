import api from '../api/client';

const publicService = {
  getCategories: () => api.get('/categories'),
  getServices: () => api.get('/services'),
  getBanners: () => api.get('/banners'),
  getBrands: () => api.get('/brands'),
  subscribe: (email) => api.post('/newsletter', { email }),
};

export default publicService;
