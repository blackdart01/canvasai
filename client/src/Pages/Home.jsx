import React, { useEffect, useState } from "react";

import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://canvasai.onrender.com/api/v1/post",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="md:flex-row justify-left md:gap-10 xs:flex xs:flex-col xs:gap-0">
        {/* <h1 className="font-extrabold text-[#222328] text-[32px]"> */}
        <div className="font-extrabold text-[#fefefe] text-transform: uppercase w-72 flex flex-col ">
          <span className="text-[32px] ">The Canvas ai</span>
          <span className="text-[42px]">Showcase</span>
        </div>
        <div className=" left-1/2 -ml-0.5 w-1 bg-orange-600"></div>
        {/* <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]"> */}
        <p className="mt-2 text-[#fffeee] text-[16px] max-w-[950px]">
          Discover a mesmerizing world of visually captivating and imaginative
          images crafted by OpenAI. Immerse yourself in a sea of creativity and
          marvel at the endless possibilities brought to life through
          cutting-edge technology. Get ready to be blown away by the most
          stunning and surreal pictures you've ever laid eyes on! Explore the
          boundaries of your imagination and embark on a journey filled with
          endless inspiration and beauty.
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              // <h2 className="font-medium text-[#666e75] text-xl mb-3">
              <h2 className="font-medium text-[#fffeee] text-xl mb-3">
                Showing Resuls for{" "}
                <span className="text-[#999fff]">{searchText}</span>:
                {/* <span className="text-[#222328]">{searchText}</span>: */}
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;

