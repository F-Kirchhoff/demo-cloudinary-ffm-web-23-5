import Main from "@/components/Main";
import Image from "next/image.js";
import React, { useState } from "react";
import styled from "styled-components";

export default function Page() {
  // image Schema
  // {
  //   url: string,
  //   height: Number,
  //   width: Number
  // }
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  async function submitImage(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    console.log(formData);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { height, width, url } = await response.json();

      const newImage = {
        height,
        width,
        url,
      };
      setImage(newImage);
    }
  }

  return (
    <Main>
      <h1>Image Vault</h1>
      <Form onSubmit={submitImage}>
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </Form>
      {image && (
        <ImageContainer>
          <Image
            src={image.url}
            alt="Uploaded image"
            layout="responsive"
            height={image.height}
            width={image.width}
          />
        </ImageContainer>
      )}
      {error && <div>{error.message}</div>}
    </Main>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 2rem auto;
  border-top: 1px solid hsl(0 0% 100% / 0.2);
  border-bottom: 1px solid hsl(0 0% 100% / 0.2);
  padding-block: 1rem;

  > button {
    border: none;
    background-color: dodgerblue;
    color: hsl(0 0% 0% / 0.8);
    padding: 12px 24px;
    border-radius: 8rem;
    margin-left: auto;
  }
`;

const ImageContainer = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  border: 2px solid grey;
  border-radius: 1rem;
  padding: 1rem;
`;
