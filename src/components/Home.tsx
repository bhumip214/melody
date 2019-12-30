import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { NewReleases, FeaturedList, Categories } from "./api";
import { H6 } from "baseui/typography";
import { styled } from "baseui";

const HomeContainer = styled("div", {
  padding: "0px 74px 40px 74px"
});

const UlContainer = styled("ul", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start"
});

const Li = styled("li", {
  margin: "10px",
  display: "flex",
  flexDirection: "column"
});

const HR = styled("hr", {
  margin: "30px 0"
});

const Home = () => {
  const [newReleases, setNewReleases] = useState<NewReleases | null>(null);
  const [featuredList, setFeaturedList] = useState<FeaturedList | null>(null);
  const [categories, setCategories] = useState<Categories | null>(null);

  useEffect(() => {
    Axios.get("https://api.spotify.com/v1/browse/new-releases", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setNewReleases(res.data.albums);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setFeaturedList(res.data.playlists);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("https://api.spotify.com/v1/browse/categories", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setCategories(res.data.categories);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <HomeContainer>
      <div>
        <H6 margin="10px">NEW RELEASES</H6>
        <UlContainer>
          {newReleases &&
            newReleases.items.map(item => {
              return (
                <Li key={item.id}>
                  <Link to={`/dashboard/albums/${item.id}`}>
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
      </div>
      <HR />
      <div>
        <H6 margin="10px">EDITOR'S PICK</H6>
        <UlContainer>
          {featuredList &&
            featuredList.items.map(item => {
              return (
                <Li key={item.id}>
                  <a href={item.href}>
                    <img
                      height="200"
                      width="200"
                      src={item.images[0].url}
                      alt={item.name}
                    />
                  </a>
                </Li>
              );
            })}
        </UlContainer>
      </div>
      <HR />
      <div>
        <H6 margin="10px">CATEGORIES</H6>
        <UlContainer>
          {categories &&
            categories.items.map(item => {
              return (
                <Li key={item.id}>
                  <H6 margin="10px">{item.name}</H6>
                  <a href={item.href}>
                    <img
                      height="200"
                      width="200"
                      src={item.icons[0].url}
                      alt={item.name}
                    />
                  </a>
                </Li>
              );
            })}
        </UlContainer>
      </div>
    </HomeContainer>
  );
};

export default Home;
