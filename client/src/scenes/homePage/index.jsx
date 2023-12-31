import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MessageWidget from "scenes/widgets/Messaging/MessageWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath} = useSelector((state) => state.user)
    return <Box>

        <Navbar/>
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex":"block"} //when we display for big screens we can have three widgets in a row whereas on smaller screens they will be on top of each other
            gap = "0.5rem"
            justifyContent="space-between"
        >
            <Box flexBasis={isNonMobileScreens ? "26%":undefined}>
                <UserWidget UserId={_id} picturePath={picturePath}/>
                <Box m="2rem 0" />
                <AdvertWidget />
                <Box m="2rem 0" />
                <FriendListWidget userId={_id} />
            </Box>
            <Box 
                flexBasis={isNonMobileScreens ? "42%":undefined}
                mt={isNonMobileScreens? undefined: "2rem"}
            >
                <MyPostWidget picturePath = {picturePath} />
                <PostsWidget userId= {_id} />
            </Box>
            {isNonMobileScreens && (
                <Box flexBasis="26%">
                   <MessageWidget UserId={_id} picturePath={picturePath} />
                </Box>
               )} 
        </Box>
    </Box>
};

export default HomePage;