import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import BlkSelector from "./blkselector.component";
import BlkUnits from "./blkunits.component"

export default class PunggolFour extends Component {

  constructor(props) {
    super(props);
    // this.setCurrentBlk = this.setCurrentBlk.bind(this);
  }

  // setCurrentBlk(e) {
  //   console.log(e.target.textContent);
  //   this.setState({currentBlkNum: e.target.textContent});
  // }

  render() {
    return(
      <Grid container justify="center">
        <Grid container justify="center">
          <BlkSelector blks={this.props.allBlkNums} setCurrentBlk={this.props.setCurrentBlk}/>
        </Grid>
        <Grid container justify="center">
          <Typography variant="h4" style={{margin: 12}}>
            {`Block: ${this.props.currentBlkNum}`}
          </Typography>
          <BlkUnits units={this.props.units} blk={this.props.currentBlkNum}/>
        </Grid>
      </Grid>
    )
  }
}