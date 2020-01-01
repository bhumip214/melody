import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { INewReleases } from "./api";
import { H6 } from "baseui/typography";
import { styled } from "baseui";
import Profile from "./Profile";

export const HomeContainer = styled("div", {
  padding: "0px 74px 40px 74px"
});

export const UlContainer = styled("ul", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start"
});

export const Li = styled("li", {
  margin: "10px",
  display: "flex",
  flexDirection: "column"
});

const NewReleases = () => {
  const [newReleases, setNewReleases] = useState<INewReleases | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    Axios.get("https://api.spotify.com/v1/browse/new-releases", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setIsLoading(false);
        setNewReleases(res.data.albums);
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, []);

  return (
    <>
      <Profile />
      <HomeContainer>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Something went wrong try again!</div>
        ) : (
          <>
            <H6 margin="10px">NEW RELEASES</H6>
            <UlContainer>
              {newReleases &&
                newReleases.items.map(item => {
                  return (
                    <Li key={item.id}>
                      <Link to={`/albums/${item.id}`}>
                        <img
                          height="200"
                          width="200"
                          src={item.images[0].url}
                          alt={item.name}
                        />
                      </Link>
                    </Li>
                  );
                })}
            </UlContainer>
          </>
        )}
      </HomeContainer>
    </>
  );
};

export default NewReleases;
