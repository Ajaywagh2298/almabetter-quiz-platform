import {Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useState} from "react";
import {Link} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const DrawerComponent = () => {
    const [draw, setDraw] = useState(false);
    return (
        <div>
            <Drawer open={draw} onClose={()=>setDraw(false)}>
                <List>
                    <ListItemButton onClick={()=>{setDraw(false)}} component={Link} to="/">
                        <ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton onClick={()=>{setDraw(false)}} component={Link} to="/my-quiz">
                        <ListItemIcon>
                            <ListItemText >My Quiz</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton onClick={()=>{setDraw(false)}}component={Link} to="/play-quiz" >
                        <ListItemIcon>
                            <ListItemText >Play Quiz</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>

                </List>
            </Drawer>
            <IconButton onClick={()=>setDraw(!draw)}>
                <MenuIcon/>
            </IconButton>
        </div>
    )
}
export default DrawerComponent;