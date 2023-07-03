import { useState, useRef } from "react";
import Cropper from "react-easy-crop";

export default function ImageCrop({ handleImageUpload}) {
  const [newImage, setNewImage] = useState("");
  const [selecting, setSelecting] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const inputRef = useRef();

  // Invoked when selecting new image
  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => onImageSelected(reader.result);
    }
  };

  // Invoked when new image file is selected
  const onImageSelected = (selectedImg) => {
    setNewImage(selectedImg);
    setSelecting(false);
  };

  const onChooseImg = () => {
    inputRef.current.click();
  };

  // get the cropped image dimensions
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  // Generating Cropped Image When Done Button Clicked
  const onCropDone = (imgCroppedArea) => {
    // Creating canvas to crop image
    const canvas = document.createElement("canvas");
    canvas.width = imgCroppedArea.width;
    canvas.height = imgCroppedArea.height;

    const context = canvas.getContext("2d");

    let image = new Image();
    image.src = newImage;
    // Draw cropped image
    image.onload = function () {
      context.drawImage(
        image,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvas.toDataURL("image/jpeg");
      setSelecting(true);
      handleImageUpload(dataURL);
    };
  };

  // Handle Cancel Button Click
  const onCropCancel = () => {
    setSelecting(true);
    setNewImage("");
  };

  return (
    <>
      {selecting
      ? (
      <div>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleOnChange}
          style={{ display: "none" }}
          />
        <button className="profile-img-button" onClick={onChooseImg}>
          <img src={require("../../images/edit-image-logo.png")} alt="edit" 
            className="profile-img-button-img"/>
        </button>
      </div>)
      : (
      <div>
        <Cropper
          image={newImage}
          aspect={1 / 1}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: "70%",
              height: "70%",
              margin: "auto",
            },
            cropAreaStyle: {
              width: "300px",
              height: "300px",
              borderRadius: "50%"
            }}
          }
          />
        <button onClick={onCropCancel} className="profile-cancel-button">
          Cancel
        </button>
        <button
          onClick={() => onCropDone(croppedArea)}
          className="profile-done-button"
          >
          Done
        </button>
      </div>
      )}
    </>
  );
}
