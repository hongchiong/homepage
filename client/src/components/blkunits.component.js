import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const rmDups = (arr) => arr.filter((v,i) => arr.indexOf(v) === i);

export default class BlkSelector extends Component {

  constructor(props) {
    super(props);

    this.blkunits = this.blkunits.bind(this);
    this.unitunits = this.unitunits.bind(this);
  }

  blkunits(){
    let unitsOfBlk = this.props.units.filter(unit => unit.blkNum == this.props.blk);
    let unitNums = unitsOfBlk.map(unit => unit.unitNumber);
    unitNums = rmDups(unitNums);

    return  unitNums.map((unitNum, i) => {
        return(
          <Grid item key={i} xs={Math.floor(12/unitNums.length)}>
            <Card>
              <CardHeader title={`Unit: ${unitNum}`} align="center"/>
              {this.unitunits(unitNum)}
            </Card>
          </Grid>

        )
    })
  }

  unitunits(unitNum) {
    let unitsOfUnit = this.props.units.filter(unit => unit.unitNumber == unitNum);
    return unitsOfUnit.map((unit, i) => {
      return (
        <CardContent align="center" key={i} style={{borderBottom: '1px solid #e6ecf7'}}>
          <Typography variant="subheading" color={unit.unitColor ? 'secondary' : 'primary'}>
            {unit.unit}
          </Typography>
        </CardContent>
      )
    });
  }

  render() {
    return(
      <Grid container justify="center" spacing={8}>
        {this.blkunits()}
      </Grid>
    )
  }
}