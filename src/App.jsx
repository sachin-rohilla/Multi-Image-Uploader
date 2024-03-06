import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useState } from "react";
import InputComp from "./components/InputComp";
import { IoIosCloseCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Modal from "./components/Modal";

function App() {
  const [image, setImage] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editImage, setEditImage] = useState([]);
  const [modalIndex, setModalIndex] = useState(null);
  const handleImageChange = (event, index) => {
    const files = event.target.files[0];

    if (isEdit) {
      // const updatedImage = image.map((item) => {
      //   if (item.id === index) {
      //     return {
      //       ...item,
      //       img: URL.createObjectURL(files),
      //     };
      //   }
      //   return item;
      // });
      // setImage(updatedImage);
      setEditImage([
        ...editImage,
        {
          id: index,
          img: URL.createObjectURL(files),
        },
      ]);
    } else {
      setImage([
        ...image,
        {
          id: index,
          img: URL.createObjectURL(files),
        },
      ]);
    }

    toast.success("Image Uploaded Successfully");
  };

  const handleClose = (id) => {
    setImage(image.filter((item) => item?.id !== id));
    toast.success("Image Deleted Successfully");
  };

  const handleEdit = (id) => {
    const updatedImage = image.map((item) => {
      const matchingEditImage = editImage.find(
        (editItem) => editItem.id === item.id
      );

      if (matchingEditImage) {
        return {
          ...item,
          img: matchingEditImage.img,
        };
      }

      return item;
    });
    setEditImage([]);
    setImage(updatedImage);
    setIsEdit(false);
    toast.success("Image Edited Successfully");
  };
  return (
    <>
      <h1 className="text-center my-4 font-semibold text-xl">Image Uploader</h1>
      <div className="px-4 py-8 border w-[90%] mx-auto mb-8 shadow-md rounded-lg flex flex-wrap justify-center items-center gap-4 ">
        {Array.from({ length: 10 })?.map((item, index) => (
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
                  <MdEdit
                    className="text-2xl cursor-pointer  absolute top-8 right-2"
                    onClick={() => {
                      setIsEdit(true);
                      setModalIndex(index + 1);
                    }}
                  />
                  {isEdit && (
                    <Modal
                      handleClose={() => {
                        setIsEdit(false);
                        setEditImage([]);
                      }}
                    >
                      <div className="flex flex-col items-center ">
                        <h1 className="font-semibold my-2">Edit Image</h1>
                        <div className=" w-52 h-52 mx-auto border-2 overflow-hidden border-dotted border-[#a78bfa] flex items-center justify-center rounded-lg ">
                          {editImage?.length > 0 ? (
                            editImage?.map(
                              (data) =>
                                data.id === modalIndex && (
                                  <img
                                    key={index}
                                    src={data?.img}
                                    alt="image"
                                  />
                                )
                            )
                          ) : (
                            <InputComp
                              handleImageChange={handleImageChange}
                              index={modalIndex}
                            />
                          )}
                        </div>
                        {editImage?.length > 0 && (
                          <button
                            className="bg-[#a78bfa] py-2 text-white rounded-lg w-52  mt-2"
                            onClick={() => handleEdit(modalIndex)}
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </Modal>
                  )}
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
