import React from 'react';
import Heading from 'terra-heading';
import Text from 'terra-text';
import Arrange from 'terra-arrange';

const HeadingSizes = () => (
  <div>
    <Heading level={1}>Huge</Heading>
    <Heading level={2}>Huge</Heading>
    <Heading level={3}>Huge</Heading>
    <Heading level={4}>Huge</Heading>
    <Heading level={5}>Huge</Heading>
    <Heading level={6}>Huge</Heading>
    <Arrange
      align="center"
      fitStart={<Text color="#333" fontSize={20}>h3</Text>}
      fill={<div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <Heading level={3} size="huge">Huge <Text color="#767676">32px (2.286rem)</Text></Heading>
      </div>}
    />
    <Arrange
      align="center"
      fitStart={<Text color="#333" fontSize={20}>h3</Text>}
      fill={<div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <Heading level={3} size="large">Large <Text color="#767676">24px (1.714rem)</Text></Heading>
      </div>}
    />
    <Arrange
      align="center"
      fitStart={<Text color="#333" fontSize={20}>h3</Text>}
      fill={<div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <Heading level={3} size="medium">Medium <Text color="#767676">20px (1.429rem)</Text></Heading>
      </div>}
    />
    <Arrange
      align="center"
      fitStart={<Text color="#333" fontSize={20}>h3</Text>}
      fill={<div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <Heading level={3} size="small">Small <Text color="#767676">18px (1.286rem)</Text></Heading>
      </div>}
    />
    <Arrange
      align="center"
      fitStart={<Text color="#333" fontSize={20}>h3</Text>}
      fill={<div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <Heading level={3} size="tiny">Tiny <Text color="#767676">16px (1.143rem)</Text></Heading>
      </div>}
    />
    <Arrange
      align="center"
      fitStart={<Text color="#333" fontSize={20}>h3</Text>}
      fill={<div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <Heading level={3} size="mini">Mini <Text color="#767676">14px (1rem)</Text></Heading>
      </div>}
    />
  </div>
);

export default HeadingSizes;
