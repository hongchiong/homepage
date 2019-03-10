import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import axios from 'axios';

import BtoData from "./components/btodata.component";

const scrapeSites = require('./scrapesites.js');
const rmDups = (arr) => arr.filter((v,i) => arr.indexOf(v) === i);

class App extends Component {

   constructor(props) {
    super(props);

    this.state={
      anchorEl: null,
      project: "Homepage",
      selectedIndex: 1,
      units: [],
      allBlkNums: [],
      currentBlkNum: ''
    };

    this.setCurrentProject = this.setCurrentProject.bind(this);
    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setCurrentBlk = this.setCurrentBlk.bind(this);

  }

  componentDidMount() {
    axios.get(`/hdb${scrapeSites.sites[this.state.selectedIndex].url}`)
    .then(response => {
      console.log(response);
      this.setState({ units: response.data[response.data.length-1].units });
      let allBlkNums = this.state.units.map(unit => unit.blkNum);
      this.setState({ allBlkNums: rmDups(allBlkNums) });
      this.setState({ currentBlkNum: this.state.allBlkNums[0] });
      console.log(this.state.currentBlkNum)
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  setCurrentProject(proj) {
    this.setState({project: proj})
  }

  setCurrentBlk(e) {
    console.log(e.target.textContent);
    this.setState({currentBlkNum: e.target.textContent});
  }

  handleClickListItem(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick(event, index) {
    this.setState({ selectedIndex: index, anchorEl: null });

    axios.get(`/hdb${scrapeSites.sites[index].url}`)
    .then(response => {
      this.setState({ units: response.data[response.data.length-1].units });
      let allBlkNums = this.state.units.map(unit => unit.blkNum);
      this.setState({ allBlkNums: rmDups(allBlkNums) });
      this.setState({ currentBlkNum: this.state.allBlkNums[0] });

      console.log("DONE GETTING DATA");
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <div>
        <AppBar color="primary" position="static" style={{padding: 8}}>
          <Toolbar>
            <TypoGraphy variant="title" color="inherit" style={{fontSize: 30}}>
              Homepage
            </TypoGraphy>

            <div style={{marginLeft: 'auto'}}>
              <List component="nav">
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  onClick={this.handleClickListItem}
                >
                <TypoGraphy variant="title" color="inherit" style={{fontSize: 30}}>
                   <ListItemText
                      primary={scrapeSites.sites[this.state.selectedIndex].projectname}
                      disableTypography={true}
                    />
                 </TypoGraphy>
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                {scrapeSites.sites.map((option, index) => (
                  <MenuItem
                    key={option.projectname}
                    disabled={index === this.state.selectedIndex}
                    selected={index === this.state.selectedIndex}
                    onClick={event => this.handleMenuItemClick(event, index)}
                  >
                    {option.projectname}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <BtoData setCurrentProject={this.setCurrentProject} units={this.state.units} allBlkNums={this.state.allBlkNums} currentBlkNum={this.state.currentBlkNum} setCurrentBlk={this.setCurrentBlk}/>
      </div>
    );
  }
}

export default App;
