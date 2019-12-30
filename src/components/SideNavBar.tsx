import * as React from "react";
import { Navigation } from "baseui/side-navigation";
import { styled } from "baseui";
import { H4 } from "baseui/typography";

const LeftAligned = styled("div", {
  textAlign: "left",
  width: "100%",
  borderRight: "1px solid grey"
});

const NavItem = styled("div", {
  display: "flex",
  alignItems: "center"
});

const ItemTitle = styled("span", {
  paddingLeft: "14px"
});

const SideNavBar = () => {
  const [activeItemId, setActiveItemId] = React.useState("#home");
  return (
    <LeftAligned>
      <H4 padding={"20px 40px"} margin={0}>
        MELODY
      </H4>
      <Navigation
        items={[
          {
            title: (
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
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <ItemTitle> Home</ItemTitle>
              </NavItem>
            ),
            itemId: "#home"
          },
          {
            title: (
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

                <ItemTitle> Playlist</ItemTitle>
              </NavItem>
            ),
            itemId: "#Playlists"
          },
          {
            title: (
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
                <ItemTitle> Albums</ItemTitle>
              </NavItem>
            ),
            itemId: "#albums"
          },
          {
            title: (
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
                  className="feather feather-users"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <ItemTitle> Artists</ItemTitle>
              </NavItem>
            ),
            itemId: "#artists"
          },
          {
            title: (
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
                <ItemTitle> Songs</ItemTitle>
              </NavItem>
            ),

            itemId: "#songs"
          },
          {
            title: (
              <NavItem>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-plus-circle"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <ItemTitle> Create Playlist</ItemTitle>
              </NavItem>
            ),
            itemId: "#createPlaylist"
          }
        ]}
        activeItemId={activeItemId}
        onChange={({ item }) => setActiveItemId(item.itemId)}
      />
    </LeftAligned>
  );
};

export default SideNavBar;
