import { Box, useTheme, InputBase, Divider, Avatar, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Send, ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import Message from "./Message";


const Chattbox = ({messagePerson, setMessagePerson}) => {
    const {palette} = useTheme()
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium; 
    const [message, setMessage] = useState(""); // message sent to the person

    return <Box sx={{
        width: '25rem', // Set the width to 200 pixels
        height: '25rem', // Set the height to 100 pixels
        backgroundColor: {dark},
        padding: '20px',
        borderRadius: '5px',
        display: 'flex', // Set the container to have flex display
        flexDirection: 'column', // Align children vertically
        justifyContent: 'flex-end', // Align children at the bottom of the container
        position: "relative", // Add position relative to the container
      }}>
      {/* the "ArrowBack" icon is positioned absolutely at the top left of the container, and the container has a position: relative property, which allows absolute positioning within it. This way, the arrow stays at the top left while other elements remain in their original position. */}
      <FlexBetween sx={{ position: "absolute", top: "1rem", alignItems: "center", justifyContent: "center" }}>
  <ArrowBack
    onClick={() => setMessagePerson('')}
    sx={{ fontSize: "2rem", "&:hover": { cursor: "pointer" } }}
  />
  {/* Position the arrow at the top left */}
  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"
  sx={{ marginLeft: "1rem", "&:hover": { cursor: "pointer" } }}
   />
  <Typography
  sx={{ marginLeft: "0.5rem" }}
  >
    Name
  </Typography>
  
</FlexBetween>
        <Message />     
        <FlexBetween>
            <InputBase
                    placeholder="Type a message..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    sx= {
                        {
                            width: "100%",
                            backgroundColor: palette.neutral.light,
                            borderRadius: "2rem",
                            padding: "1rem 2rem",
                            marginRight: "1rem"
                        }
                    }
                >
                {/* <Box sx={{backgroundColor: '#881C1C', position: "absolute", right:'0rem', height:'2rem'}} /> */}
                </InputBase>
                <Send sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }} />
        </FlexBetween>
      </Box>
}

export default Chattbox;