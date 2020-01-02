import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoriesItem, CategoryPlaylists } from "./api";
import Axios from "axios";
import { styled } from "baseui";

const CategoryContainer = styled("div", {
  margin: "0px 0px 70px 80px",
  display: "flex",
  flexDirection: "column"
});

const UlContainer = styled("ul", {
  display: "flex",
  flexWrap: "wrap"
});

const Li = styled("li", {
  backgroundColor: "#1F1F1F",
  padding: "20px 20px 10px 20px",
  margin: "0px 20px 20px 0px",
  display: "flex",
  flexDirection: "column",
  width: "200px",
  fontSize: "14px",
  textAlign: "center",
  borderRadius: "10px"
});

const Name = styled("p", {
  fontWeight: "bold",
  color: "white",
  textDecoration: "none"
});

interface CategoryProps {
  match: any;
}
const Category = (props: CategoryProps) => {
  const [category, setCategory] = useState<CategoriesItem | null>(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [
    categoryPlaylists,
    setCategoryPaylists
  ] = useState<CategoryPlaylists | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const id = props.match.params.categoryId;

    setIsCategoryLoading(true);
    Axios.get(`https://api.spotify.com/v1/browse/categories/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setIsCategoryLoading(false);
        setCategory(res.data);
      })
      .catch(error => {
        console.log(error);
        setCategoryError(true);
      });

    setIsLoading(true);
    Axios.get(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setIsLoading(false);
        setCategoryPaylists(res.data.playlists);
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, [props.match.params.categoryId]);

  return (
    <>
      {isCategoryLoading ? (
        <CategoryContainer>Loading...</CategoryContainer>
      ) : categoryError ? (
        <div>Something went wrong try again!</div>
      ) : (
        <>
          {category && (
            <CategoryContainer>
              <h3> {category.name.toUpperCase()}</h3>

              {isLoading ? (
                <UlContainer>Loading...</UlContainer>
              ) : error ? (
                <div>Something went wrong try again!</div>
              ) : (
                <UlContainer>
                  {categoryPlaylists &&
                    categoryPlaylists.items.map(item => {
                      return (
                        <Li key={item.id}>
                          <Link to={`/playlists/${item.id}`}>
                            <img
                              height="160px"
                              width="160px"
                              src={item.images[0].url}
                              alt={item.name}
                            />
                            <Name>{item.name}</Name>
                          </Link>
                        </Li>
                      );
                    })}
                </UlContainer>
              )}
            </CategoryContainer>
          )}
        </>
      )}
    </>
  );
};

export default Category;
