import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useState } from "react";
import InputComp from "./components/InputComp";
import { IoIosCloseCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";

function App() {
  const [image, setImage] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const handleImageChange = (event, index) => {
    const files = event.target.files[0];
    setImage([
      ...image,
      {
        id: index,
        img: URL.createObjectURL(files),
      },
    ]);
    toast.success("Image Uploaded Successfully");
  };

  const handleClose = (id) => {
    setImage(image.filter((item) => item?.id !== id));
    toast.success("Image Deleted Successfully");
  };
  console.log("img", image);
  return (
    <>
      <div className="px-4 py-8 border w-[90%] mx-auto my-8 shadow-md rounded-lg flex flex-wrap justify-center items-center gap-4 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item, index) => (
          <div className="relative w-52 h-52" key={index}>
            <div className=" w-full h-full border-2 overflow-hidden border-dotted border-[#a78bfa] flex items-center justify-center rounded-lg ">
              {image?.length > 0 &&
              image.some((item) => item?.id === index + 1) ? (
                image?.map(
                  (data) =>
                    data.id === index + 1 && (
                      <img key={index} src={data?.img} alt="image" />
                    )
                )
              ) : (
                <InputComp
                  handleImageChange={handleImageChange}
                  index={index + 1}
                />
              )}
            </div>
            {image?.length > 0 &&
              image.some((item) => item?.id === index + 1) && (
                <div>
                  <IoIosCloseCircle
                    className="text-2xl cursor-pointer  absolute top-2 right-2"
                    onClick={() => handleClose(index + 1)}
                  />
                  {/* <MdEdit
                    className="text-2xl cursor-pointer  absolute top-8 right-2"
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  /> */}
                </div>
              )}
          </div>
        ))}
      </div>
      <ToastContainer autoClose={2000} hideProgressBar />
    </>
  );
}

export default App;
