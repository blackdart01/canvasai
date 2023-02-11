import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("please enter a prompt");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        // alert("Success");
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("please generate an image with proper details");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        {/* <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1> */}
        <h1 className="font-extrabold text-[#fffeee] text-[32px]">Create</h1>
        {/* <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]"> */}
        <p className="mt-2 text-[#fffeee] text-[16px] max-w[500px]">
          Unleash your creativity and bring your wildest imaginations to life
          with Canvas AI! Create visually stunning and breathtaking images that
          will leave your audience in awe. Share your masterpieces with the
          world and become a part of a thriving community of artists,
          innovators, and visionaries. With Canvas AI, the possibilities are
          endless, and the sky is the limit for what you can achieve. So why
          wait? Start bringing your visions to life today and join the
          revolution in digital art.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            // className="border border-gray-300"
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Two futuristic towers with a skybridge covered in lush foliage, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-128 p-3 h-128 flex justify-center items-center">
            {/* <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center"> */}
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/18 h-9/18 object-contain opacity-40"
                // className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-orange-600 rounded-md text-md w-full sm:w-auto px-5 py-2.5 text-center hover:bg-orange-700 hover:delay-100"
            // className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate Image"}
          </button>
        </div>
        <div className="mt-10">
          {/* <p className="mt-2 text-[#666e75] text-[14px]"> */}
          <p className="mt-2 text-[#fffeee] text-[14px]">
            Showcase your art to the world by sharing it with our thriving
            community.
          </p>
          <button
            type="submit"
            className="text-white mt-3 bg-orange-600 rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-orange-700 hover:delay-100"
            // className="text-white mt-3 bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#555bff]"
          >
            Share with the community
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
