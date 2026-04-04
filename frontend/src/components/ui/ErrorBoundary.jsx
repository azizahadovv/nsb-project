import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-md mx-auto py-20 text-center">
          <p className="text-4xl mb-3">⚠️</p>
          <h2 className="font-display text-xl font-extrabold mb-2">Xatolik yuz berdi</h2>
          <p className="text-sm text-gray-500 mb-4">Iltimos, sahifani qayta yuklang</p>
          <button onClick={() => window.location.reload()}
            className="px-5 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold">
            Qayta yuklash
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
