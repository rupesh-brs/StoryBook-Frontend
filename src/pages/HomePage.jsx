import Navbar from "../Navbar.jsx";
import StoriesPage from "./StoriesPage.jsx";
const HomePage = () => {
  return (
    <>
    <div>
      <Navbar />  {/* Include the navbar */}
      <div className="mt-5">
        <h1 className="text-3xl font-bold text-center">Welcome to StoryBook!</h1>
         {/* <h3 className="text-center text-2xl mt-4">Where stories come to life.</h3> */}
      </div>
    </div>

    <div className="mt-5 px-5">
        
        <StoriesPage/>
    </div>

    </>



    
  );
};

export default HomePage;