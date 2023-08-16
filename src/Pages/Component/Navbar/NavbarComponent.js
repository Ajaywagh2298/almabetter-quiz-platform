import {AppBar, Box, Tab, Tabs, Toolbar, useMediaQuery, useTheme} from "@mui/material";
import {useState} from "react";
import logo from "../../Image/logo.png";
import DrawerComponent from "../Other/DrawerComponent";
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
const NavbarComponent = () => {
    const[val, setVal] = useState(0); //val for the value property of <Tabs>

    const theme=useTheme();
    const isMatch= useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div className='navbar' style={{marginBottom:"10px"}}>
            <AppBar elevation={5} sx={{backgroundColor:"white",height:"70px"}} position="fixed">
                <Toolbar>
                    <Box sx={{display:"flex", justifyContent:"space-between", marginTop:"10px", width:"100%", alignItems:"center"}} component="div">
                        <Box >
                            <img src={logo} alt="logo" width="150" height="40" />
                        </Box>
                        {
                            isMatch ? <DrawerComponent/>:<>
                                <Tabs indicatorColor="primary" value={val} onChange={(e,val)=>setVal(val)}>
                                    <Tab label="Home"  component={Link} to={"/"} >  <HomeIcon/></Tab>
                                    <Tab label="My Quiz" component={Link} to={"/my-quiz"} ></Tab>
                                    <Tab label="Play Quiz" component={Link} to={"/play-quiz"}></Tab>
                                </Tabs>
                            </>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavbarComponent;