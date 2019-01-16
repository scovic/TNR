import React from "react";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";

class UserProfile extends React.Component {
  render() {
    return (
      <GridContainer>
        <GridItem xs={8}>
          <Card>
            <CardBody>bla</CardBody>
          </Card>
        </GridItem>
        <GridItem xs={4}>
          <Card>
            <CardBody>bla</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default UserProfile;
