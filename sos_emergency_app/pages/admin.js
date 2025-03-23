import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export default function SuperAdmin() {
  const router = useRouter();

  // Check if the user is authenticated and has the correct userType
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');

    if (!token || !userId || userType !== 'super_admin') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You do not have permission to access this page.',
      }).then(() => {
        router.push('/auth'); // Redirect to the login page
      });
    }
  }, [router]);

  return (
    <div className="super-admin-page">
      <h1>Super Admin Dashboard</h1>
      <p>Welcome to the Super Admin Management Page!</p>

      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Manage All Stations</li>
          <li>View System-Wide Reports</li>
          <li>Handle Administrative Tasks</li>
        </ul>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userType');
          router.push('/auth'); // Redirect to the login page after logout
        }}
      >
        Log Out
      </button>
    </div>
  );
}