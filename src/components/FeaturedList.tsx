import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { IFeaturedList } from "./api";
import { H6 } from "baseui/typography";
import { HomeContainer, UlContainer, Li } from "./NewReleases";
import { AuthContext } from "../App";

const FeaturedList = () => {
  const [featuredList, setFeaturedList] = useState<IFeaturedList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const auth = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    Axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setIsLoading(false);
        setFeaturedList(res.data.playlists);
      })
      .catch(error => {
        console.log(error);
        auth.setTokenStatus("invalid");
        setError(true);
      });
  }, [auth]);

  return (
    <HomeContainer>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something went wrong try again!</div>
      ) : (
        <>
          <H6 margin="10px">Featured List</H6>
          <UlContainer>
            {featuredList &&
              featuredList.items.map(item => {
                return (
                  <Li key={item.id}>
                    <Link to={`/playlists/${item.id}`}>
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
  );
};

export default FeaturedList;
