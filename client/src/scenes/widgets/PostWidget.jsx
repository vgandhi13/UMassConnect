import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  


const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments
}) => {
    const [isComments, setIsComments] = useState(false)
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token)
    const {palette} = useTheme();
    const loggedInUserId = useSelector((state) => state.user._id);

    // in post models, like is a map of type boolean
    /* likes = {
        "userId" = true,
        "userId2" = true
    } */
    // if userId already exists in the object, we can check if the user has liked the post or not by looking at this likes object
    // if they have not liked the post, it will not show up in this object. this is basically like a hashset
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length; //number of likes this post has

   
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    //a function that will change the number of likes
    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({userId: loggedInUserId})
        })
        const updatedPost = await response.json();
        dispatch(setPost({post: updatedPost}))
    };

    return (
        <WidgetWrapper m="2rem 0">
          <Friend
            friendId={postUserId}
            name={name}
            subtitle={location}
            userPicturePath={userPicturePath}
          />
          <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
          </Typography>
          {picturePath && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}
          <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
              <FlexBetween gap="0.3rem">
                <IconButton onClick={patchLike}>
                  {isLiked ? (
                    <FavoriteOutlined sx={{ color: primary }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
                <Typography>{likeCount}</Typography>
              </FlexBetween>
    
              <FlexBetween gap="0.3rem">
                <IconButton onClick={() => setIsComments(!isComments)}>
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comments.length}</Typography>
              </FlexBetween>
            </FlexBetween>
    
            <IconButton>
              <ShareOutlined />
            </IconButton>
          </FlexBetween>
          {isComments && (
            <Box mt="0.5rem">
              {comments.map((comment, i) => (
                <Box key={`${name}-${i}`}>
                  <Divider />
                  <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment}
                  </Typography>
                </Box>
              ))}
              <Divider />
            </Box>
          )}
        </WidgetWrapper>
      );
    };
    
    export default PostWidget;