import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from './components/ui/Spinner';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

const Home = lazy(() => import('./pages/public/HomePage'));
const Catalog = lazy(() => import('./pages/public/CatalogPage'));
const ProductDetail = lazy(() => import('./pages/public/ProductPage'));
const Cart = lazy(() => import('./pages/public/CartPage'));
const Checkout = lazy(() => import('./pages/public/CheckoutPage'));
const Blog = lazy(() => import('./pages/public/BlogPage'));
const BlogDetail = lazy(() => import('./pages/public/BlogDetailPage'));
const Login = lazy(() => import('./pages/public/LoginPage'));
const Register = lazy(() => import('./pages/public/RegisterPage'));
const Account = lazy(() => import('./pages/public/AccountPage'));
const About = lazy(() => import('./pages/public/AboutPage'));
const Contact = lazy(() => import('./pages/public/ContactPage'));
const Wishlist = lazy(() => import('./pages/public/WishlistPage'));
const SolarCalc = lazy(() => import('./pages/public/SolarCalculatorPage'));
const PcBuilder = lazy(() => import('./pages/public/PcBuilderPage'));
const NotFound = lazy(() => import('./pages/public/NotFoundPage'));

const Dashboard = lazy(() => import('./pages/admin/DashboardPage'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProductsPage'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrdersPage'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminBlogs = lazy(() => import('./pages/admin/AdminBlogsPage'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategoriesPage'));
const AdminBrands = lazy(() => import('./pages/admin/AdminBrandsPage'));
const AdminServices = lazy(() => import('./pages/admin/AdminServicesPage'));
const AdminPortfolio = lazy(() => import('./pages/admin/AdminPortfolioPage'));
const AdminBanners = lazy(() => import('./pages/admin/AdminBannersPage'));

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="brands" element={<AdminBrands />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="banners" element={<AdminBanners />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog/:slug" element={<Catalog />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/solar-calculator" element={<SolarCalc />} />
          <Route path="/pc-builder" element={<PcBuilder />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
