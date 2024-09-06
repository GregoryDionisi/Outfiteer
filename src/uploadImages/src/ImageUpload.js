import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState("");

  function covertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  }

  function uploadImage() {
    fetch("http://localhost:5002/upload-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image
      }),
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  }

  return (
    <div className="auth-wrapper">
      <div className='auth-inner' style={{width: "auto"}}>
        Let's Upload Image<br/>
        <input
          accept="image/*"
          type="file"
          onChange={covertToBase64}
        />
        {image ? <img width={100} height={100} src={image} alt="Preview"/> : ""}
        <button onClick={uploadImage}>Upload</button>
      </div>
    </div>
  );
}

export default ImageUpload;
