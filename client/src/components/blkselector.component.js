import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

export default class BlkSelector extends Component {

  constructor(props) {
    super(props);
    this.allBlks = this.allBlks.bind(this);
  }

  allBlks() {
    return this.props.blks.map((blk, i) => {
      return(
          <Chip onClick={this.props.setCurrentBlk} label={blk} key={i} variant="outlined" color="primary" clickable={true} style={{ margin: 8, padding: 8, fontSize: 18}}/>
        );
    });
  }

  render() {
    return(
      <Grid>
        {this.allBlks()}
      </Grid>
    )
  }
}