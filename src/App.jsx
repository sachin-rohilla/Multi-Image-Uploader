import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useState } from "react";
import InputComp from "./components/InputComp";
import { IoIosCloseCircle } from "react-icons/io";

function App() {
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    const files = event.target.files[0];

    console.log(files);
    setImage(URL.createObjectURL(files));
  };
  return (
    <>
      <div className="px-16 py-8 border w-[90%] mx-auto my-8 shadow-md rounded-lg ">
        {/* <h1>Multi Image Uploader</h1> */}
        <div className="relative w-52 h-52">
          <div className=" w-full h-full border-2 overflow-hidden border-dotted border-[#a78bfa] flex items-center justify-center rounded-lg ">
            {image ? (
              <img src={image} alt="image" />
            ) : (
              <InputComp handleImageChange={handleImageChange} />
            )}
          </div>
          {image && (
            <IoIosCloseCircle
              className="text-2xl cursor-pointer  absolute top-2 right-2"
              onClick={() => setImage(null)}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
