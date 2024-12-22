import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar'; // Assuming you have a Navbar component

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;