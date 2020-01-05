import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { ICategories } from "./api";
import { H6 } from "baseui/typography";
import { HomeContainer, UlContainer, Li } from "./NewReleases";
import { AuthContext } from "../App";

const Categories = () => {
  const [categories, setCategories] = useState<ICategories | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const auth = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    Axios.get("https://api.spotify.com/v1/browse/categories", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setIsLoading(false);
        setCategories(res.data.categories);
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
          <H6 margin="10px">CATEGORIES</H6>
          <UlContainer>
            {categories &&
              categories.items.map(item => {
                return (
                  <Li key={item.id}>
                    <H6 margin="10px">{item.name}</H6>
                    <Link to={`/categories/${item.id}`}>
                      <img
                        height="200"
                        width="200"
                        src={item.icons[0].url}
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

export default Categories;
