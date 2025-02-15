
import React, { useEffect, useState,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Typography} from "@mui/material";
import {Card,CardContent,Avatar,Link,IconButton,CardOverflow,AspectRatio,
  FormControl, FormLabel,Textarea,Menu,MenuItem,ListItemDecorator} from '@mui/joy'

import { fetchContentCreation, addContent, updateAllContentCreation,addNewPost } from "../redux/slicers/contentCreationSlicer";
import {MoreHoriz,FormatBold,FormatItalic,KeyboardArrowDown,Check} from '@mui/icons-material';

function ContentCreation() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.contentCreation.status);
  const allContentCreation = useSelector((state) => state.contentCreation.allContentCreation);
  const [isShow,setIsShow]=useState()
  const [ignore,setIgnore]=useState()
  const [isVisible,setIsVisible]=useState();
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [content,setContet]=useState(''); 
  const [title,setTitle]=useState('');
  const user = JSON.parse(localStorage.getItem('userLogin'))
  const boxRef = useRef(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContentCreation());
    }
  }, [dispatch, status]);

  useEffect(() => {
   
    document.addEventListener("mousedown", handleClickOutside);


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 

  const handleClickOutside = (event) => {
    
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setIsShow(false); 
      setIgnore(false)
      setIsVisible(false)
    }
  };

 




const handleIsShow=()=>{
  setIsShow('true')
  setIgnore('true')
}

ContentCreation.handleClickOutside = () => onClose();
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

 const handlePost=async()=>{
  setIsShow(false)
  setIgnore('true')
  setIsVisible('true')
 }

 const handleAddPost=async()=>{
  const newPost=({
    title: title,
    content: content,
    date: Date.now(),
    myUser: { id: user.id ,name:user.name},
    whichFile:null,
  })
  try{
  const respone=dispatch(addNewPost(newPost))
  console.log(respone);
  const updatedContentCreations = [...allContentCreation,respone.arg];
  dispatch(updateAllContentCreation(updatedContentCreations));

  setContet("");

}catch(err){
  console.log(err);
  
}
 }

    
  const handleUpload = async () => {
   
    if (!selectedFile) {
      setMessage("Please select a file");
      return;
    }
    console.log(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "ContentCreation",
      JSON.stringify({
        title: title,
        content: "",
        date:Date.now(),
        myUser: { id: user.id ,name:user.name},
        whichFile:null,
      })
    );

    try {
      const response = await dispatch(addContent(formData));
      if (response.meta.requestStatus === "fulfilled") {
        const jsonResponse = response.payload;

        
        const updatedContentCreations = [...allContentCreation, jsonResponse];
        dispatch(updateAllContentCreation(updatedContentCreations));

        setMessage("File uploaded successfully!");
      } else {
        setMessage("Error uploading file.");
      }
    } catch (error) {
      setMessage("Error uploading file: " + error.message);
    }
  };



  return (
    
    <>

    <h1 style={{ textAlign: "center", color: '#2c6e49',marginTop:'7%'}}>העלאת תוכן</h1>
    {!ignore&&<button onClick={handleIsShow}>insert</button>}
     {isShow &&<Box 
        ref={boxRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 4,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
         <Textarea
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="enter your title or desription…" />
        <Typography variant="h5" component="h1" gutterBottom>
          Upload Your File
        </Typography>

        <Button onClick={handlePost}>post</Button>
       
        <Button 
          variant="contained"
          component="label"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          Choose File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        <Typography variant="body2" sx={{ color: selectedFile ? "#000" : "#888" }}>
          {selectedFile ? selectedFile.name : "No file chosen"}
        </Typography>

        <Button
          variant="contained"
          onClick={handleUpload}
          sx={{
            width: "100%",
            backgroundColor: "#4caf50",
            "&:hover": { backgroundColor: "#388e3c" },
          }}
        >
          Upload
        </Button>

        {message && (
          <Typography
            variant="body2"
            sx={{
              color: message.includes("successfully") ? "green" : "red",
            }}
          >
            {message}
          </Typography>
        )}
      </Box>}
      

      {isVisible&& <FormControl sx={{ maxWidth: '600px', width: '100%', margin: '0 auto' }} ref={boxRef}>
  <FormLabel>Your comment</FormLabel>
  
  <Textarea
    value={content}
    onChange={(e) => setContet(e.target.value)}
    placeholder="Type something here…"
    minRows={3}
    endDecorator={
      <Box
        sx={{
          display: 'flex',
          gap: 'var(--Textarea-paddingBlock)',
          pt: 'var(--Textarea-paddingBlock)',
          borderTop: '1px solid',
          borderColor: 'divider',
          flex: 'auto',
        }}
      >
        <IconButton
          variant="plain"
          color="neutral"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <FormatBold />
          <KeyboardArrowDown fontSize="md" />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          size="sm"
          placement="bottom-start"
          sx={{ '--ListItemDecorator-size': '24px' }}
        >
          {['200', 'normal', 'bold'].map((weight) => (
            <MenuItem
              key={weight}
              selected={fontWeight === weight}
              onClick={() => {
                setFontWeight(weight);
                setAnchorEl(null);
              }}
              sx={{ fontWeight: weight }}
            >
              <ListItemDecorator>
                {fontWeight === weight && <Check fontSize="sm" />}
              </ListItemDecorator>
              {weight === '200' ? 'lighter' : weight}
            </MenuItem>
          ))}
        </Menu>
        
        <IconButton
          variant={italic ? 'soft' : 'plain'}
          color={italic ? 'primary' : 'neutral'}
          aria-pressed={italic}
          onClick={() => setItalic((prev) => !prev)}
        >
          <FormatItalic />
        </IconButton>
        
        <Button onClick={handleAddPost} sx={{ ml: 'auto' }}>
          Send
        </Button>
      </Box>
    }
    sx={[
      {
        minWidth: 300,
        fontWeight,
      },
      italic ? { fontStyle: 'italic' } : { fontStyle: 'initial' },
    ]}
  />
</FormControl>}
<div style={{ display: "flex", flexWrap: "wrap", gap: "5%" }}>
  
      {allContentCreation&&allContentCreation?.map((contentCreation) => {
        return (
        
          <Card
            key={contentCreation.id}
            variant="outlined"
            sx={{ minWidth: 300,maxWidth:300,maxHeight:400, overflow: "hidden", overflowY: "auto",marginTop:"1%",'--Card-radius': (theme) => theme.vars.radius.xs}}
          >
            <CardContent orientation="horizontal" sx={{ alignItems:'center', gap: 1,maxHeight:45}}>
              <Box
                sx={{
                  position: 'relative',
                  maxHeight:45,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    m: '-2px',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                  },
                }}
              >
                <Avatar
                  size="sm"
                  src="/static/logo.png"
                  sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
                />
              </Box>
              <Typography sx={{ fontWeight: 'lg' }}>{contentCreation.myUser.name|| "MUI"}</Typography>
              <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                <MoreHoriz />
              </IconButton>
            </CardContent>
          {contentCreation.whichFile=='video'||contentCreation.whichFile=='image'&&<CardOverflow>
            <AspectRatio>
              {contentCreation.whichFile=='video' ?(
                <video
                  controls
                  style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                >
                  <source
                      src={`data:video/mp4;base64,${contentCreation.content}`}
                      type="video/mp4"
                  
                  />
                  Your browser does not support the video tag.
                </video>
              )  : (
                
                
              
                <img
                  style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                  src={`data:image/jpeg;base64,${contentCreation.content}`}
                  alt={contentCreation.title || "Uploaded"} 
              />
            
              )}
            </AspectRatio>
          </CardOverflow>}
            <CardContent sx={{maxWidth:'100%'}}>
              <Link
                component="button"
                underline="none"
                textColor="text.primary"
                sx={{ fontSize: 'sm', fontWeight: 'lg' }}
              >
                {contentCreation.likes || "0 Likes"}
              </Link>
              
              <Typography sx={{ fontSize: 'sm' ,wordBreak:'break-word',maxWidth:'100%'}}>
                <Link
                  component="button"
                  color="neutral"
                  textColor="text.primary"
                  sx={{ fontWeight: 'lg' }}
                >
                  {contentCreation.myUser.name || "MUI"}
                </Link>{' '}
                {contentCreation.title || "No description available."}
                
              </Typography>
              {contentCreation.whichFile!='image'&&contentCreation.whichFile!='video'&&<Typography sx={{wordBreak:'break-word',maxWidth:'100%'}}>
              {contentCreation.content}
              </Typography>}
             
              <Link
                component="button"
                underline="none"
                sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
              >
                {contentCreation.date|| "Just now"}
              </Link>
            </CardContent>
          </Card>
        );
      })}
      
    </div>
   
    </>
  );
}

export default ContentCreation;