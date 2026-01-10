import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../components/common/Loading';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading message="Kontrol ediliyor..." />;
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
