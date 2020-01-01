import * as React from "react";
import { Navigation } from "baseui/side-navigation";
import { styled } from "baseui";
import { H4 } from "baseui/typography";
import { NavLink } from "react-router-dom";

const LeftAligned = styled("div", {
  textAlign: "left",
  width: "100%",
  height: "100%"
});

const NavItem = styled("div", {
  display: "flex",
  alignItems: "center"
});

const ItemTitle = styled("span", {
  paddingLeft: "14px"
});

const SideNavBar = () => {
  const [activeItemId, setActiveItemId] = React.useState("#newReleases");
  return (
    <LeftAligned>
      <H4 padding={"20px 40px"} margin={0}>
        MELODY
      </H4>
      <Navigation
        items={[
          {
            title: (
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                to="/new-releases"
              >
                <NavItem>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-disc"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <ItemTitle> New Releases</ItemTitle>
                </NavItem>
              </NavLink>
            ),
            itemId: "#newReleases"
          },
          {
            title: (
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                to="/featured-list"
              >
                <NavItem>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-list"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>

                  <ItemTitle> Featured List</ItemTitle>
                </NavItem>
              </NavLink>
            ),
            itemId: "#featuredList"
          },
          {
            title: (
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                to="/categories"
              >
                <NavItem>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-music"
                  >
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                  <ItemTitle> Categories</ItemTitle>
                </NavItem>
              </NavLink>
            ),

            itemId: "#categories"
          }
        ]}
        activeItemId={activeItemId}
        onChange={({ item }) => setActiveItemId(item.itemId)}
      />
    </LeftAligned>
  );
};

export default SideNavBar;
