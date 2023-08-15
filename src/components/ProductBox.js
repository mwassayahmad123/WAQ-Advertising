import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import {
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from "react-router-dom";
import ChatBox from "./ChatBox";
const AdsDisplay = () => {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const postOwner = {
    name: '',
    userID: '',
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollectionRef = collection(db, "ads");
        const querySnapshot = await getDocs(adsCollectionRef);
        const adsData = querySnapshot.docs.map((doc) => doc.data());
        setAds(adsData);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAds();
  }, []);

  const handleAdClick = (ad) => {
    setSelectedAd(ad);
  };

  const handleCloseDialog = () => {
    setSelectedAd(null);
  };

  const handleChatButtonClick = (ad) => {
    // Add your logic here to handle the chat button click
    // For example, you can navigate to a chat window or show a chat overlay.
    console.log("Chat button clicked for ad:", ad);
  };

  return (
    <div>
      <Grid container spacing={3} style={{ paddingTop: "20px" }}>
        {ads.map((product, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4} // Add this line for larger screens
            style={{ display: "flex", cursor: "pointer" }}
            onClick={() => handleAdClick(product)}
          >
            <Paper
              elevation={3}
              style={{
                padding: "10px",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  flex: 1,
                  marginBottom: "10px",
                  maxHeight: "200px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                ${product.price}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                UserID: {product.userID}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={!!selectedAd}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedAd && selectedAd.title}
          <IconButton
            aria-label="close"
            style={{ position: "absolute", right: 8, top: 8 }}
            onClick={handleCloseDialog}
          >
            <CancelIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedAd && (
            <div>
              <img
                src={selectedAd.image}
                alt={selectedAd.title}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
              <Typography variant="body1" color="textSecondary">
                {selectedAd.description}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {postOwner.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {postOwner.userID}
              </Typography>
             <Link to= "/ChatBox"> <Button
                variant="contained"
                color="primary"
                startIcon={<ChatIcon />}
                onClick={() => handleChatButtonClick(selectedAd)}
              >
                Chat
              </Button></Link>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdsDisplay;

// import { getDocs, collection, serverTimestamp,addDoc, onSnapshot} from "firebase/firestore";
// import { query, where, orderBy } from "firebase/firestore";
// import { makeStyles } from "@material-ui/core/styles";
// import { Link, useNavigate } from "react-router-dom";
// import CancelIcon from '@mui/icons-material/Cancel';
// import React, { useState, useEffect, useRef } from "react";
// import { useUserAuth } from '../context/UserAuthContext';
// import CloseIcon from "@mui/icons-material/Close";
// import SendIcon from "@mui/icons-material/Send";
// import { db } from "../firebase";
// import {
//   Grid,
//   Paper,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   IconButton,
//   TextField,
//   List,
//   ListItemAvatar,
//   ListItem,
//   Avatar,
//   ListItemText
// } from "@mui/material";
// const useStyles = makeStyles((theme) => ({
//   dialogContent: {
//     display: "flex",
//     flexDirection: "column",
//     height: "400px",
//   },
//   chatArea: {
//     flexGrow: 1,
//     overflowY: "auto",
//     padding: theme.spacing(2),
//   },
//   chatInput: {
//     display: "flex",
//     alignItems: "center",
//     marginTop: theme.spacing(2),
//   },
//   closeButton: {
//     position: "absolute",
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//   },
// }));
// const AdsDisplay = ({}) => {
//   const {user, logout } = useUserAuth();
//   const [ads, setAds] = useState([]);
//   const [selectedAd, setSelectedAd] = useState('');
//   const [chatMessages,setChatMessages]=useState([]);
//   const [chatDialogOpen, setChatDialogOpen] = useState(false);
//   const [newMessage, setNewMessage]=useState("");
//   const chatting=useRef(null);
//   const classes=useStyles();
//   const navigate = useNavigate();
//   const [postOwner,setpostOwner]=useState({
//     name: '',
//     userId:'',
//   });
//   const handleLogout=async (e)=>{e.preventDefault();
//     try{
//       await logout();
//       navigate("/login");
//     }
//     catch{
//       console.log("erroe in logout");
//     }
//   }
//   const fetchMessages = async (senderId, receiverId) => {
//     try {
//       const chatCollectionRef = collection(db, "Chats");
//       const currentTimestamp = new Date();
//       const yesterdayTimestamp = new Date();
//       yesterdayTimestamp.setDate(yesterdayTimestamp.getDate() - 1);
//       const q = query(
//         chatCollectionRef,
//         where("sender", "in", [senderId, receiverId]),
//         where("receiver", "in", [senderId, receiverId]),
//         where("timestamp", ">=", yesterdayTimestamp),
//         where("timestamp", "<=", currentTimestamp),
//         orderBy("timestamp", "asc")
//       );
//       const querySnapshot = await getDocs(q);
//       const messages = querySnapshot.docs.map((doc) => doc.data());
//       console.log("message is fetched",)
//       setChatMessages(messages)
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const updatedMessages = snapshot.docs.map((doc) => doc.data());
//         setChatMessages(updatedMessages);
//       })
//       return unsubscribe;
//     }
//     catch (error) {
//       console.error("Error fetching messages:", error);
//       return [];
//     }
//   } ;
//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         const adsCollection = collection(db, "ads_data");
//         const query_pic = await getDocs(adsCollection);
//         const adsData = query_pic.docs.map((doc) => doc.data());
//         console.log("Ads". adsData)
//         setAds(adsData);
        
//         if(adsData.length>0)
//         {
//           chatting.current=fetchMessages(user.uid,selectedAd.userId)
//         }
//       } catch (error) {
//         console.error("Error fetching ads:", error);
//       }
//     };
//     console.log(ads)
//     fetchAds();
//   }, [user.uid,selectedAd.userId,ads]);
//   useEffect(() => {
//     if (chatting.current) {
//       const unsubscribe = chatting.current; // Get the stored query reference
//       return () => {
//         unsubscribe();
//       };
//     }
//   }, []);
//   const handleAdClick = (ad) => {
//     setSelectedAd(ad);
//     setpostOwner(ad);
//   };
//   const handleCloseDialog = () => {
//     setSelectedAd('');
//   };
// const handleSendMessage = async()=>{
//   if(newMessage.trim()!=="")
//   {
//     const msg_details={
//       sender_id:user.uid,
//       reciver_id:selectedAd.userId,
//       msg:newMessage,
//       time:serverTimestamp()
//     };
//     await addDoc(collection(db, "msg_data"),msg_details);
//   }
//   setNewMessage("");
// }
//   return (
//     <div>
      
//       <Grid container spacing={3}>
//         {ads.map((product, index) => (
//           <Grid
//             key={index}
//             item
//             xs={12}
//             sm={6}
//             md={4}
//             style={{ display: "flex", cursor: "pointer" }}
//             onClick={() => handleAdClick(product)}
//           >
//             <Paper
//               elevation={3}
//               style={{
//                 padding: "10px",
//                 flexGrow: 1,
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <div
//                 style={{
//                   flex: 1,
//                   marginBottom: "10px",
//                   maxHeight: "200px",
//                   overflow: "hidden",
//                 }}
//               >
//                 <img
//                   src={product.img}
//                   alt={product.title}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//               </div>
//               <Typography variant="h6">{product.title}</Typography>
//               <Typography variant="body2" color="textSecondary">
//                 {product.description}
//               </Typography>
//               <Typography variant="subtitle1" color="primary">
//                 ${product.price}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//       <Dialog
//         open={!!selectedAd}
//         onClose={handleCloseDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           {selectedAd && selectedAd.title}
//           <IconButton
//             aria-label="close"
//             style={{ position: "absolute", right: 8, top: 8 }}
//             onClick={handleCloseDialog}
//           >
//             <CancelIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           {selectedAd && (
//             <div>
//               <img
//                 src={selectedAd.img}
//                 alt={selectedAd.title}
//                 style={{
//                   width: "100%",
//                   maxHeight: "400px",
//                   objectFit: "cover",
//                 }}
//               />
//               <Typography variant="body1" color="textSecondary">
//                 {selectedAd.description}
//               </Typography>
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Close
//           </Button>
//           <Button color="secondary" onClick={()=>{setChatDialogOpen(true);}}>
//             Chat
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={chatDialogOpen} onClose={handleCloseDialog} Width="50%">
//         <DialogTitle>
//           <p>Owner Name: {postOwner.name}</p>
//           <p>Owner ID: {postOwner.userId}</p>
//           <IconButton
//             className={classes.closeButton}
//             onClick={() => {
//               setChatDialogOpen(false);
//             }}
//           >
//             <CloseIcon style={{ color: "red" }} />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent className={classes.dialogContent}>
//           <div className={classes.chatArea}>
//             <List>
//               {chatMessages.map((message, index) => (
//                 <ListItem key={index}>
//                   <ListItemAvatar>
//                     <Avatar>{message.sender[0]}</Avatar>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary={
//                       message.sender === user.uid ? "You" : postOwner
//                     } // Assuming senderId is the current user's ID
//                     secondary={message.message}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </div>
//           <div className={classes.chatInput}>
//             <TextField
//               label="Type a message"
//               variant="outlined"
//               fullWidth
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <IconButton 
//                 onClick={handleSendMessage}>
//               <SendIcon
//                 style={{ color: "green" }}
//               />
//             </IconButton>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
// export default AdsDisplay;





